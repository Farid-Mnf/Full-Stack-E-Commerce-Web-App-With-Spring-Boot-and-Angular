import { UserDTO } from "./UserDTO";

export class ProductDTO{
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    categoryId: string;
    userDTO: UserDTO;
  /*

userDTO: 
email:"farid@gmail.com"
id:"c7f30071-03e5-47fa-bf14-358d915e0125"
name:"Farid Faisal"

  */
    constructor(
      id: string,
      name: string,
      description: string,
      price: number,
      imageUrl: string,
      quantity: number,
      categoryId: string,
      userDTO: UserDTO
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
      this.quantity = quantity;
      this.categoryId = categoryId;
      this.userDTO = userDTO;
    }
  
}