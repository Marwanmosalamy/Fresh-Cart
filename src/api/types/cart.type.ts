import { ProductType } from "./routemisr.type";

export interface CartType {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  cartOwner: string;
  createdAt: string;
  products: CartProduct[];
  totalCartPrice: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface CartProduct {
  count: number;
  price: number;
  _id: string;
  product: ProductType;
}