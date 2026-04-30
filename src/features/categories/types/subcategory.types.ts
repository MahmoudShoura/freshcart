export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubcategoryMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface SubcategoriesResponse {
  result: number;
  metadata: SubcategoryMetadata;
  data: Subcategory[];
}

export interface SubcategoryWithCategory {
  _id: string;
  name: string;
  slug: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubcategoryRequest {
  name: string;
  category: string;
}

export interface UpdateSubcategoryRequest {
  name?: string;
  category?: string;
}
