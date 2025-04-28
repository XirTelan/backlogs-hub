import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Image from "next/image";

type SimpleCarouselProps = {
  images: string[];
};

export function SimpleCarousel({ images }: SimpleCarouselProps) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden border  border-border-subtle-1 rounded-lg bg-bg-main p-2 ">
      <div className="relative h-full w-full ">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0 "
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={images[current]}
              alt={`Slide ${current + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-btn-primary  hover:bg-btn-primary/70 text-white"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-btn-primary hover:bg-btn-primary/70 text-white"
        >
          <FaChevronRight />
        </button>

        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 w-2 rounded-full ${
                index === current ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
