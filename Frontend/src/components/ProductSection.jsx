import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import product1 from "../assets/images/c1.png";
import product2 from "../assets/images/c2.png";
import product3 from "../assets/images/c3.png";
import product4 from "../assets/images/c4.png";

const ProductSection = () => {
  const [liked, setLiked] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState("All");

  const toggleLike = (e, title) => {
    e.preventDefault();
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  const getCategoryStyle = (cat) => {
    if (!cat) return "";
    if (cat.toLowerCase().includes("sale"))  return "bg-[#FFDAD6] text-[#930E52]";
    if (cat.toLowerCase().includes("new"))   return "bg-[#D3E9CA] text-[#566A51]";
    if (cat.toLowerCase().includes("best"))  return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-600";
  };

  const Cards = [
    { title: "Clothing",      category: "Sale 25%",    image: product1, rating: 4.5, reviews: 120, price: "₹1,299" },
    { title: "Accessories",   category: "New Arrival", image: product2, rating: 4.8, reviews: 38,  price: "₹1,850" },
    { title: "Home & Living", category: "Best Sellers",image: product3, rating: 4.6, reviews: 74,  price: "₹2,450" },
    { title: "Footwear",      image: product4,          rating: 4.3, reviews: 56,  price: "₹3,199" },
    { title: "Gifts",         image: product1,          rating: 4.7, reviews: 92,  price: "₹899"  },
    { title: "Jewellery",     image: product2,          rating: 4.9, reviews: 210, price: "₹4,999" },
  ];

  const filters = ["All", "New Arrivals", "Best Sellers", "On Sale"];

  const filteredCards = activeFilter === "All"
    ? Cards
    : [
        ...Cards.filter(({ category }) => {
          if (activeFilter === "New Arrivals")  return category?.toLowerCase().includes("new");
          if (activeFilter === "Best Sellers")  return category?.toLowerCase().includes("best");
          if (activeFilter === "On Sale")        return category?.toLowerCase().includes("sale");
          return false;
        }),
        ...Cards.filter(({ category }) => {
          if (activeFilter === "New Arrivals")  return !category?.toLowerCase().includes("new");
          if (activeFilter === "Best Sellers")  return !category?.toLowerCase().includes("best");
          if (activeFilter === "On Sale")        return !category?.toLowerCase().includes("sale");
          return true;
        }),
      ];

  const { pathname } = useLocation();

  return (
    <section className="w-full py-10 bg-[#F4F3F1]">
      <div className="flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-4 px-4 sm:px-8 md:flex-row md:items-center md:justify-between md:px-20">
          <div>
            <p className="text-xs font-bold tracking-widest text-orange-600">CURATED CATALOG</p>
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>
            <p className="text-sm text-gray-500">Discover something you'll love for a lifetime.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-sm font-medium py-1.5 px-4 rounded-full border transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-2 scrollbar-hide lg:grid lg:grid-cols-6 lg:gap-6 lg:overflow-visible lg:px-20 lg:pb-0">
          {filteredCards.map(({ title, image, category, rating, reviews, price }) => (
            <Link
              key={title}
              to={`/category/${title.toLowerCase().replace(" & ", "-").replaceAll(" ", "-")}`}
              className={`group relative flex-shrink-0 w-[68vw] snap-start rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 sm:w-[44vw] lg:w-auto ${
                pathname.includes(title.toLowerCase().replace(" & ", "-").replaceAll(" ", "-"))
                  ? "ring-2 ring-orange-500"
                  : ""
              }`}
            >
              {/* Image area */}
              <div className="relative h-52 lg:h-60 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Heart button */}
                <button
                  onClick={(e) => toggleLike(e, title)}
                  className="absolute right-3 top-3 h-9 w-9 flex items-center justify-center rounded-full bg-white shadow-sm cursor-pointer transition-transform hover:scale-110"
                >
                  <Heart
                    size={16}
                    className={liked.has(title) ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </button>

                {/* Category badge */}
                {category && (
                  <span className={`absolute left-3 top-3 text-xs font-semibold py-1 px-2.5 rounded-full ${getCategoryStyle(category)}`}>
                    {category}
                  </span>
                )}
              </div>

              {/* Info panel */}
              <div className="p-4 flex flex-col gap-1">
                <p className="text-xs font-bold tracking-widest text-orange-600 uppercase">{title}</p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-gray-800">{rating}</span>
                  <span className="text-xs text-gray-400">({reviews})</span>
                </div>

                <h3 className="text-base font-semibold text-gray-900 leading-tight">
                  {title} Collection
                </h3>

                <p className="text-base font-bold text-gray-900 mt-1">{price}</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductSection;
