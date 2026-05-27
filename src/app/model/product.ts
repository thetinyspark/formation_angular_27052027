export class Product {
    id: number;
    name: string;
    price: number;
    description: string;
    img: string;
    platform: string;

    constructor(id: number, name: string, price: number, description: string, img: string, platform: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.img = img;
        this.platform = platform;
    }
}
