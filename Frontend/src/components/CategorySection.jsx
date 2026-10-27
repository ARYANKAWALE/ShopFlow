import React from "react";
import { Link, useLocation } from "react-router-dom";
import product1 from "../assets/images/c1.png";
import product2 from "../assets/images/c2.png";
import product3 from "../assets/images/c3.png";
import product4 from "../assets/images/c4.png";

const CategorySection = () => {
  const Cards = [
    {
      title: "Clothing",
      image: product1,
    },
    {
      title: "Accessories",
      image: product2,
    },
    {
      title: "Home & Living",
      image: product3,
    },
    // {
    //   title: "Footwear",
    //   image: product4,
    // },
    // {
    //   title: "Gifts",
    //   image: product1,
    // },
    // {
    //   title: "Jewellery",
    //   image: product2,
    // },
  ];

  const { pathname } = useLocation();

  return (
    <section className="w-full p-6">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between px-4 sm:px-8 md:flex-row md:px-20">
          <div>
            <p className="text-sm font-bold text-orange-600">
              CURATION BY DEPARTMENT
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              Shop by Category
            </h2>
          </div>

          <p className="max-w-md text-lg font-semibold text-gray-600">
            Curated selections across our essential departments, balanced for
            everyday comfort.
          </p>
        </div>

        {/* Mobile: horizontal scroll row | Desktop: 3-col grid */}
        <div className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-20 lg:pb-0">
          {Cards.map(({ title, image, count }) => (
            <Link
              key={title}
              to={`/category/${title.toLowerCase().replace(" & ", "-").replaceAll(" ", "-")}`}
              className={`group relative h-60 w-[70vw] flex-shrink-0 snap-start overflow-hidden rounded-xl sm:w-[45vw] lg:h-80 lg:w-auto lg:flex-shrink ${
                pathname.includes(
                  title.toLowerCase().replace(" & ", "-").replaceAll(" ", "-"),
                )
                  ? "ring-2 ring-orange-500"
                  : ""
              }`}
            >
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                <div>
                  <p className="text-xs font-semibold text-orange-200">
                    {count} ITEMS
                  </p>
                  <h3 className="text-lg font-semibold lg:text-xl">{title}</h3>
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-xl transition-transform group-hover:rotate-45">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
