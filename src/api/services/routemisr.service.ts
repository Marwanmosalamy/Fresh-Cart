import { CategoryType, ProductType, SubCategoryType } from "../types/routemisr.type";

export async function getAllProducts(): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
      cache: "force-cache"
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getSingleProduct(
  id: string,
): Promise<ProductType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getAllCategories(): Promise<CategoryType[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getSingleCategory(id: string): Promise<CategoryType | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getSubcategoriesOnCategory(categoryId: string): Promise<SubCategoryType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getProductsByCategory(categoryId: string): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}

export async function getProductsBySubcategory(subcategoryId: string): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${subcategoryId}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return undefined;
  }
}