export class ProductDTO{
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity: number;
    categoryId: string;
    userId: string;
  
    constructor(
      id: string,
      name: string,
      description: string,
      price: number,
      imageUrl: string,
      quantity: number,
      categoryId: string,
      userId: string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.imageUrl = imageUrl;
      this.quantity = quantity;
      this.categoryId = categoryId;
      this.userId = userId;
    }
  
}