import React, { useLayoutEffect, useRef } from "react";

const MESSAGES = [
  "Up to 70% Discount",
  "Huge Summer Collection",
  "Shop the latest products in the summer collection",
];

const COPIES = 8;
const SPEED_PX_PER_SEC = 90;

const MarqueeRow = ({ hidden = false }) => (
  <div
    className="flex shrink-0 items-center"
    aria-hidden={hidden || undefined}
  >
    {Array.from({ length: COPIES }, (_, copy) =>
      MESSAGES.map((text) => (
        <span
          key={`${copy}-${text}`}
          className="flex items-center gap-10 px-5 text-sm font-medium tracking-wide"
        >
          {text}
          <span aria-hidden="true" className="text-white/40">
            •
          </span>
        </span>
      )),
    )}
  </div>
);

const Carousel = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const applySpeed = () => {
      const distance = track.scrollWidth / 2;
      if (!distance) return;
      track.style.animationDuration = `${distance / SPEED_PX_PER_SEC}s`;
    };

    applySpeed();
    const observer = new ResizeObserver(applySpeed);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden bg-black py-2.5 text-white">
      <div ref={trackRef} className="marquee-track flex w-max whitespace-nowrap">
        <MarqueeRow />
        <MarqueeRow hidden />
      </div>
    </div>
  );
};

export default Carousel;
