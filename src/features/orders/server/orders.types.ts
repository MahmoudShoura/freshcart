export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface OrderCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface OrderBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface OrderProduct {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: OrderCategory;
  brand: OrderBrand;
  ratingsAverage: number;
  id: string;
}

export interface OrderCartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

export type paymentMethodType = "cash" | "card";

export interface Order {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: paymentMethodType;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

//Orders Response ( Array of Orders)
export type OrdersResponse = Order[];
