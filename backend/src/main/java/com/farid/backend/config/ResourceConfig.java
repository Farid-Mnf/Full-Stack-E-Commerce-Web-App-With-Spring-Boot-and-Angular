package com.farid.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class ResourceConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map /assets/user-images/ URL path to /var/www/images/
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/var/www/images/");
    }
}