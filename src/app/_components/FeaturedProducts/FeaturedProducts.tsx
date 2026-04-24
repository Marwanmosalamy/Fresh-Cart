import { getAllProducts } from "@/api/services/routemisr.service";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";

export default async function FeaturedProducts() {
  const allProducts = await getAllProducts();

  return (
    <>
    <div className="w-[90%] mx-auto  my-12">

        <h1 className=" text-2xl md:text-3xl font-bold flex items-center gap-3 text-[#00173A]">
          <span className="w-1.5 h-7 md:h-8 bg-[#16A34A] rounded-full inline-block"></span>
           Featured<span className="text-[#16A34A]">Products</span>
        </h1>   
    </div>
      <div className="w-[90%] mx-auto my-8 flex flex-wrap">
        {allProducts?.map((product) => (
          <Link
            href={`/productdetails/${product.id}`}
            key={product.id}
            className="p-2 w-full lg:w-1/4 xl:w-1/5 hover:-translate-y-2.5 hover:-translate-x-1.25 hover:shadow-xl transition-all"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </>
  );
}
