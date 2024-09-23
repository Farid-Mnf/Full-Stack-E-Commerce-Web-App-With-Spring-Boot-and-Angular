export class FilterDTO{
    category: string | null;
    priceRange: number | null;
    inStock: boolean | null;
    searchParameter: string | null;
    constructor(category: string | null, priceRange: number | null, inStock: boolean | null, searchParameter: string | null){
        this.category = category;
        this.priceRange = priceRange;
        this.inStock = inStock;
        this.searchParameter = searchParameter;
    }
}