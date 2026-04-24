import { ProductType } from "@/api/types/routemisr.type";
import {
  getAllProducts,
  getSingleProduct,
} from "@/api/services/routemisr.service";
import React from "react";
import { ImSad2 } from "react-icons/im";

import ProductMainSection from "./_components/ProductMainSection";
import RelatedProductsSection from "./_components/RelatedProductsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Productdetails(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const myProduct = await getSingleProduct(id);
  const allProducts = await getAllProducts();

  if (!myProduct) {
    return (
      <>
        <div className="h-screen flex flex-col justify-center items-center gap-6">
          <div className="flex items-center text-center text-3xl font-bold text-[#16A34A]">
            Product not found, Try Again
            <span className="ps-3 text-4xl flex items-center">
              <ImSad2 />
            </span>
          </div>

          <Link href="/">
            <Button className="bg-[#0aad0a] hover:bg-green-600 text-white px-8 py-6 rounded-full flex items-center justify-center gap-2 font-medium text-[15px] shadow-sm cursor-pointer">
              Back to Home Page
            </Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <ProductMainSection myProduct={myProduct} />
      <RelatedProductsSection allProducts={allProducts || []} />
    </div>
  );
}
