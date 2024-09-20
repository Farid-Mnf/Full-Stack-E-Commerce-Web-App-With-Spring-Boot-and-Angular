export class FilterDTO{
    category: string | null;
    priceRange: number | null;
    inStock: boolean | null;
    constructor(category: string | null, priceRange: number | null, inStock: boolean | null){
        this.category = category;
        this.priceRange = priceRange;
        this.inStock = inStock;
    }
}