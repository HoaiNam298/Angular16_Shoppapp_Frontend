import { Product } from "./product";

export interface OrderDetail {
    number_of_products: number;
    price: number;
    total_money: number;
    product: Product;
}