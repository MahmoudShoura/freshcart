export interface WishlistProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category?: {
    _id: string;
    name: string;
  };
  brand?: {
    _id: string;
    name: string;
  };
}

export interface WishlistResponse {
  status: string;
  message: string;
  data: WishlistProduct[];
}

export interface WishlistError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
