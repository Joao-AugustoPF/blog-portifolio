"use client";

import React from "react";
import { motion } from "framer-motion";
import content from "@/app/content.json"; // Usando o caminho especificado
import { CarouselTestimonials } from "@/components/layout/Carousel/CarouselTestimonials";

const TestimonialsSection: React.FC = () => {
  const { heading } = content.testimonialsSection;

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          {heading}
        </motion.h2>
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CarouselTestimonials />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
