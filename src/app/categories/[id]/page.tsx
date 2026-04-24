import {
  getProductsByCategory,
  getSingleCategory,
  getSubcategoriesOnCategory,
} from "@/api/services/routemisr.service";
import { ImSad2 } from "react-icons/im";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryClientView from "./_components/CategoryClientView";

export default async function CategoryDetails(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;

  const viewMode = searchParams?.view === "products" ? "products" : "folders";

  const [category, subcategories, initialProducts] = await Promise.all([
    getSingleCategory(id),
    getSubcategoriesOnCategory(id),
    getProductsByCategory(id),
  ]);

  if (!category) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl font-bold text-[#16A34A] flex items-center gap-3">
          Category not found <ImSad2 size={30} />
        </h1>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <CategoryClientView
      category={category}
      subcategories={subcategories || []}
      initialProducts={initialProducts || []}
      initialView={viewMode}
    />
  );
}
