import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User } from "lucide-react";
import { ScrollContainerContext } from "../../context/ScrollContainerContext";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/shop", label: "Shop" },
  { path: "/collections", label: "Collections" },
  { path: "/about", label: "About" },
];

const Navigation = () => {
  const { pathname } = useLocation();
  const [hidden, setHidden] = useState(false);
  const scrollContainerRef = useContext(ScrollContainerContext);

  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    let lastY = container.scrollTop;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = container.scrollTop;

        if (currentY <= 10) {
          setHidden(false);
        } else if (currentY > lastY + 3) {
          setHidden(true);
        } else if (currentY < lastY - 3) {
          setHidden(false);
        }

        lastY = currentY;
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainerRef]);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 h-20 w-full
        flex items-center justify-around
        border-b border-border bg-white px-6
        transition-transform duration-300 ease-in-out
        ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <p className="text-lg font-bold text-white">E</p>
        </div>
        <p className="text-3xl font-bold text-ink">ShopFlow</p>
      </div>

      <div className="flex gap-20">
        {NAV_LINKS.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`text-lg font-medium transition-colors hover:opacity-70 ${
              pathname === path
                ? "font-bold underline underline-offset-4"
                : "opacity-60"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className="flex gap-10">
        <button aria-label="Shopping bag" className="text-ink">
          <ShoppingBag />
        </button>
        <button aria-label="User profile" className="text-ink">
          <User />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
