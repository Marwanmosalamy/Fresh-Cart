"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
export default function Slider({ 
  listOfImages, 
  heightclass 
}: { 
  listOfImages: string[]; 
  heightclass?: string;
}) {
  const slideContent = [
    {
      title: "Fresh Products Delivered\nto your Door",
      description: "Get 20% off your first order",
      buttonText1: "Shop Now",
      buttonText2: "View Deals",
    },
    {
      title: "Premium Quality\nGuaranteed",
      description: "Fresh from farm to your table",
      buttonText1: "Shop Now",
      buttonText2: "Learn More",
    },
    {
      title: "Fast & Free\nDelivery",
      description: "Same day delivery available",
      buttonText1: "Order Now",
      buttonText2: "Delivery Info",
    },
  ];

  return (
    <div className="relative group w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/30 !opacity-80",
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-green-600 !w-8 !rounded-full transition-all",
        }}
        navigation={{
          nextEl: ".button-next-main",
          prevEl: ".button-prev-main",
        }}
        className="h-full overflow-hidden shadow-sm"
      >
        {listOfImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={src}
                className="w-full h-full object-cover"
                alt="banner"
              />

              <div className="absolute inset-0 bg-green-600/70 px-5 sm:px-8 md:px-12 text-white flex items-center">
                <div className="max-w-xl flex flex-col gap-3 sm:gap-4 md:gap-6">
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg capitalize whitespace-pre-line">
                    {slideContent[index]?.title}
                  </h2>

                  <p className="text-sm sm:text-base md:text-xl opacity-90 drop-shadow">
                    {slideContent[index]?.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                    <Link href="/shop" className="bg-white text-green-700 font-bold py-2 px-5 sm:py-2.5 sm:px-7 md:py-3 md:px-10 text-sm md:text-base rounded-full shadow-md hover:bg-white/90 transition-all hover:scale-105 inline-block text-center">
                      {slideContent[index]?.buttonText1}
                    </Link>
                    <Link href="/shop" className="bg-transparent border-2 border-white text-white font-semibold py-2 px-5 sm:py-2.5 sm:px-7 md:py-3 md:px-10 text-sm md:text-base rounded-full hover:bg-white/10 transition-all hover:scale-105 inline-block text-center">
                      {slideContent[index]?.buttonText2}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="button-prev-main absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer
        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 rounded-full
        shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]
        text-green-600 hover:bg-white transition-all hover:scale-110"
      >
        <svg
          className="rotate-180 w-2.5 h-2.5 sm:w-3 sm:h-3"
          viewBox="0 0 11 20"
          fill="none"
        >
          <path
            d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className="button-next-main absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer
        w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/90 rounded-full
        shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]
        text-green-600 hover:bg-white transition-all hover:scale-110"
      >
        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 11 20" fill="none">
          <path
            d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
