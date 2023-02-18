import CarouselComp from "@/components/carousel/CarouselComp";
import ssrProtection from "@/utils/ssrProtection";
import homeSlides from "@/assets/home-slides";

export default function Home() {
  return (
    <div>
      <CarouselComp slidesArr={homeSlides} />
    </div>
  );
}

//  ? Server side func, for better performance
// export async function getServerSideProps() {
//   return await ssrProtection();
// }
