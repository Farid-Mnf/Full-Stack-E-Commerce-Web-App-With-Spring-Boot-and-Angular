import { AddressDTO } from "./AddressDTO";

export class UserDTO{
    username: string;
    email: string;
    phone: string;
    password: string;
    addressDTO: AddressDTO;
    constructor(username: string, email: string, phone: string, password: string, addressDTO: AddressDTO){
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.addressDTO = addressDTO;

    }
}