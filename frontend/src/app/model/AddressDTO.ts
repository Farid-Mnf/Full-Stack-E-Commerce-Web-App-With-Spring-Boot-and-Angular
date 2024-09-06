export class AddressDTO {
    city: string;
    country: string;
    streetName: string;
    constructor(city: string, country: string, streetName: string){
        this.city = city;
        this.country = country;
        this.streetName = streetName;
    }
}