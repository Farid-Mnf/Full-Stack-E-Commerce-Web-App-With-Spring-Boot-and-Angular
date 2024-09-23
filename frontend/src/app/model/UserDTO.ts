import { AddressDTO } from "./AddressDTO";

export class UserDTO{
    id: string | null;
    name: string;
    email: string;
    phone: string;
    password: string;
    userImage: string;
    addressDTO: AddressDTO;
    cartDTO: any;
    constructor(id: string, name: string, email: string, phone: string, password: string, userImage: string, addressDTO: AddressDTO, cartDTO: any){
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.userImage = userImage;
        this.addressDTO = addressDTO;
        this.cartDTO = cartDTO;
    }
}