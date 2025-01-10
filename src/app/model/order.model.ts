import { Address } from "./address.model";
import { OrderItem } from "./order-item.model";

export class Order {
    orderItems: OrderItem[];
    code: string;
    address: Address;
    creationDate: Date;
    totalPrice: number;
    deliveryMode: string;
    paymentMethod: string;
}