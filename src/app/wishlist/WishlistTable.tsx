import {
  FaTrashAlt,
  FaCartPlus,
  FaCheck,
  FaArrowLeft,
  FaShoppingCart,
} from "react-icons/fa";
import Link from "next/link";
import AddBtn from "../_components/AddBtn/AddBtn";
import { Button } from "@base-ui/react";

export default function WishlistTable({ products, onRemove, disabled }: any) {
  return (
    <div className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-[12px] uppercase text-gray-400 font-bold tracking-wider">
            <th className="p-5 pl-8">Product</th>
            <th className="p-5">Price</th>
            <th className="p-5">Status</th>
            <th className="p-5 text-right pr-8">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product: any) => (
            <tr
              key={product._id}
              className="group hover:bg-gray-50/50 transition-colors"
            >
              <td className="p-5 pl-8">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg border border-gray-100 flex items-center justify-center p-2 bg-white shrink-0">
                    <img
                      src={product.imageCover}
                      className="max-w-full max-h-full object-contain"
                      alt={product.title}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[16px]  text-[#111827] line-clamp-1">
                      {product.title}
                    </h3>
                    <span className="text-[11px] text-[#16A34A] uppercase">
                      {product.category.name}
                    </span>
                  </div>
                </div>
              </td>

              <td className="p-5">
                <span className="text-[14px] font-black ">
                  {product.price} EGP
                </span>
              </td>

              <td className="p-5">
                <div className="flex items-center gap-1.5 text-[#16A34A] bg-[#F0FDF4] px-2 py-1 rounded-md w-fit border border-[#DCFCE7]">
                  <FaShoppingCart size={16} />
                  <span className="text-[14px] text-nowrap">In cart</span>
                </div>
              </td>

              <td className="p-3 pr-8">
                <div className="flex items-center gap-3">
                  <AddBtn
                    id={product.id}
                    classes="bg-[#16A34A] text-white px-4 py-2.5 whitespace-nowrap rounded-md font-bold text-[12px] flex items-center  justify-center gap-2  shadow-sm active:scale-95 transition-all"
                    word={
                      <>
                        <FaCartPlus size={16} /> Add to Cart
                      </>
                    }
                  />

                  <Button
                    onClick={() => onRemove(product._id)}
                    disabled={disabled}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-gray-100 transition-all shrink-0"
                  >
                    <FaTrashAlt size={15} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
