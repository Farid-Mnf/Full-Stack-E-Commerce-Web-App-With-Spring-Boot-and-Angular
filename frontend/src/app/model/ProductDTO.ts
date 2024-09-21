import { UserDTO } from "./UserDTO";

export class ProductDTO{
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    availableQuantity: number;
    categoryId: string;
    userDTO: UserDTO;

    constructor(
      id: string,
      name: string,
      description: string,
      price: number,
      imageUrl: string,
      availableQuantity: number,
      categoryId: string,
      userDTO: UserDTO
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
      this.availableQuantity = availableQuantity;
      this.categoryId = categoryId;
      this.userDTO = userDTO;
    }
  
}