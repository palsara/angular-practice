export class Order {
    id: number = 0;
    insdate: Date = new Date();
    product: number = 0;
    category: string = '';
    userName: string = '';
    userEmail: string = '';
    shippingAddress: string = '';
    quantity: number = 1;
    date?: string;
}
