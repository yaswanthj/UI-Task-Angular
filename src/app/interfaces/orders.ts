export interface customer {
    customerAddress: string
    customerAge: number
    customerID: number
    customerName: string
}

export interface Orders {
    orderAmount: number
    orderDate: number
    orderDetail: string
    orderID: number,
    customer: customer
}
