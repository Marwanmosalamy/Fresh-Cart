import FeaturedProducts from "./_components/FeaturedProducts/FeaturedProducts";
import Slider from "./_components/Slider/Slider";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import { PulseLoader } from "react-spinners";

import { lazy, Suspense } from "react";
import loading from "./loading";
import NewsletterSection from "./_components/NewsletterSection/NewsletterSection";
import HomeFeatures from "./_components/HomeFeatures/HomeFeatures";
import HomePromoBanners from "./Home/HomePromoBanners";
const LazyHomeCategoryComponent = lazy(
  () => import("./_components/HomeCategories/HomeCategories"),
);

export default function Home() {
  return (
    <>
      <Slider
        heightclass="h-[400px]"
        listOfImages={[img1.src, img2.src, img3.src]}
      />

      <HomeFeatures />
      <Suspense
        fallback={
          <div className=" flex items-center justify-center">
            <PulseLoader />
          </div>
        }
      >
        <LazyHomeCategoryComponent />
      </Suspense>
      <HomePromoBanners />
      <FeaturedProducts />

      <NewsletterSection />
    </>
  );
}
