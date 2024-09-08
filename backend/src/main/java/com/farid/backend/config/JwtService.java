package com.farid.backend.config;

import com.farid.backend.entity.User;
import com.farid.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final UserRepository userRepository;

    @Value("${security.jwt.secret-key}")
    private String VERY_BIG_SECRET_KEY;

    private final long JWT_EXPIRATION = 604800000L; // 1 week in milliseconds


    public String generateJwtToken(Authentication authentication){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + JWT_EXPIRATION);

        UserDetails user = (UserDetails) authentication.getPrincipal();
        User entityUser = userRepository.findUserByEmail(user.getUsername()).orElseThrow();

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", entityUser.getName());
        extraClaims.put("cartId", entityUser.getCart().getId());
        extraClaims.put("userId", entityUser.getId());

        return Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(expiration)
                .addClaims(extraClaims)
                .setIssuedAt(new Date())
                .signWith(getSigningKey())
                .compact();
    }
    public boolean validateJwtToken(String jwtToken) {
        try{
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(jwtToken);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public String extractUsername(String jwt){
        return extractClaims(jwt, Claims::getSubject);
    }

    public <T> T extractClaims(String jwt, Function<Claims, T> resolveClaims){
        return resolveClaims.apply(extractAllClaims(jwt));
    }

    public Claims extractAllClaims(String jwt){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    public Key getSigningKey(){
        byte[] keysBytes = Decoders.BASE64.decode(VERY_BIG_SECRET_KEY);
        return Keys.hmacShaKeyFor(keysBytes);
    }
}
