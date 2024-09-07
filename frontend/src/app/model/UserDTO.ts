import { AddressDTO } from "./AddressDTO";

export class UserDTO{
    name: string;
    email: string;
    phone: string;
    password: string;
    addressDTO: AddressDTO;
    constructor(name: string, email: string, phone: string, password: string, addressDTO: AddressDTO){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.addressDTO = addressDTO;

    }
}