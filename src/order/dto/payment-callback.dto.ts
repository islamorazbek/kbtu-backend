type orderState = "SUCCESS" | "ERROR" | "AUTH_OK"

export interface PaymentCallbackDto {
    callbackType: "PAY",
    ordersId: number,
    ordersState: orderState,
    "merchantsId": 1002,
    extOrdersId: number,
    billAmount:number,
    totalAmount: number,
    authAmount: number,
    currency: "KZT",
    message: string,
    description:string
}