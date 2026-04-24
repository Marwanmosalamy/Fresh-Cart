import { FaHeart, FaArrowRight } from "react-icons/fa"
import Link from 'next/link'

export default function EmptyWishlist() {
    return (
        <div className=" flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100">
                <FaHeart className="text-gray-300 text-[40px]" />
            </div>
            <h2 className="text-[24px] font-bold text-[#111827] mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-100">Browse products and save your favorites here.</p>
            <Link href="/" className="bg-[#0AAD0A] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#089608] transition-all shadow-lg shadow-green-100/50 group">
                Browse Products <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}