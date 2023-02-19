// Libraries
// Types
// Components/Assets
import CarouselComp from "@/components/Carousel/CarouselComp";
import homeSlides from "@/assets/home-slides";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function Home() {
  return (
    <>
      <div className="bg-[url('/tail-imgs/gym-bg.jpg')] -z-1">
        <div className="bg-[rgba(23,23,23,0.7)]">
          <div className="w-2/3 mx-auto py-12">
            <h1 className="h-16 text-center text-xl">FIT U</h1>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
              cumque eligendi illum iusto. ipsum dolor sit amet consectetur
              adipisicing elit
            </p>
          </div>
        </div>
      </div>

      <h2>We have exercises like</h2>
      <CarouselComp slidesArr={homeSlides} />
    </>
  );
}
