import { ReactNode } from "react";

export const googleAPi = "AIzaSyAALuGqF68jJ8v9_69tXtEcGkRdX5NgU1s";

export const basAPI = "https://taki.pythonanywhere.com";

//export const basAPI = "http://127.0.0.1:8000";


export type UserDetails = {
  // customer_detais: string;
  address: string;
  avatar: string;
  id: number;
  phone: number;
};

export type FornecedorType = {
  id: number;
  user: number;
  name: string;
  phone: string;
  address: string;
  logo_url: string;
  licenca: string;
  aprovado: boolean;
  criado_em: string;
  modificado_em: string;
  children: ReactNode;
};

export interface OrderTypes {
  id: number;
  order_details: {
    id: number;
    product: {
      title: string;
      price: number;
    };
    quantity: number;
    sub_total: number;
  }[];
  customer: {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    address: string;
  };
  driver: {
    id: number;
    name: string;
    avatar: string;
    phone: string;
    address: string;
  };
  total: number;
  status: string;
}


export type Shop = {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo_url: string;
  category?: {
    name: string;
    image: string;
  };
  is_approved: boolean;
  barnner: boolean;
};

export interface Categoria {
  id: number;
  name: string;
  className?: string;
  image: string | null;
  slug?: string;
}

export type Restaurant = {
  id: number;
  user: number;
  name: string;
  phone: string;
  address: string;
  logo: string;
  category?: {
    name: string;
    image: string;
  };
  licenca: string;
  aprovado: boolean;
  criado_em: string;
  modificado_em: string;
  children: ReactNode;
};

export interface Category {
  id: number;
  name: string;
  className?: string;
  image: string | null;
  slug?: string;
}
