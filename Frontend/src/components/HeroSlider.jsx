import React, {useState,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slide1 from "../assets/images/bg1.png";
import { ArrowRight, MoveUpRight } from "lucide-react";

const HeroSlider = () => {

  
  const slides = [
    {
      tag: "NEW AUTUMN / WINTER ESSENTIALS",
      title: "Find Your Everyday Essentials",
      description:
      "Thoughtfully selected tactile goods crafted by independent makers, made quiet and easy to shop.",
      image: "/images/hero.webp",
      button: "Explore Collection",
    },
    {
      tag: "MADE FOR EVERYDAY",
      title: "Simple Things, Beautifully Made",
      description:
      "Discover timeless pieces designed to bring comfort and style into your everyday life.",
      image: "/images/hero-2.webp",
      button: "Shop Collection",
    },
    {
      tag: "CURATED JUST FOR YOU",
      title: "Discover Your New Favorites",
      description:
        "Explore thoughtful essentials, quality materials, and products made to last.",
      image: "/images/hero-3.webp",
      button: "Discover More",
    },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);
  const slide = slides[active];

  return (
    <section
      className="relative h-[550px] bg-cover bg-center"
      style={{ backgroundImage: `url(${slide1})` }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute left-[6.3%] top-8 z-10
                      w-[min(620px,87%)] rounded-xl bg-white p-8
                      sm:p-9">
        <p className="mb-3 text-sm font-semibold text-[#52664f]">
          ● {slide.tag}
        </p>

        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          {slide.title}
        </h1>

        <p className="mt-3 text-base text-gray-600 sm:text-lg">
          {slide.description}
        </p>

        <button className="mt-5 bg-black px-5 py-3 font-semibold text-white">
          {slide.button} →
        </button>

        <div className="mt-8 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-6 bg-black"
                  : "w-2 bg-gray-300 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          setActive((active - 1 + slides.length) % slides.length)
        }
        className="absolute left-0 top-1/2 z-20 rounded-full bg-white p-3 shadow"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={() => setActive((active + 1) % slides.length)}
        className="absolute right-0 top-1/2 z-20 rounded-full bg-white p-3 shadow"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
}
export default HeroSlider;
