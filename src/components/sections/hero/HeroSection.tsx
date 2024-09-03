"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Users } from "lucide-react";
import content from "@/app/content.json"; // Importa o JSON

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    alert(`${content.heroSection.ctaSuccessMessage} ${email}`);
  };

  const heroContent = content.heroSection;

  return (
    <section className="relative table w-full py-6 overflow-hidden bg-gradient-to-b to-transparent from-indigo-600/20 dark:from-indigo-600/40">
      <div className="container relative">
        <motion.div
          className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="md:col-span-6">
            <div className="md:me-8">
              <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-black dark:text-white relative">
                {heroContent.heading}{" "}
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-indigo-600 relative inline-block">
                  <span className="relative text-white">
                    {heroContent.highlight}
                  </span>
                </span>{" "}
              </h4>
              <p className="text-slate-400 text-lg max-w-xl">
                {heroContent.description}
              </p>

              <div className="subcribe-form mt-6 mb-3">
                <form className="relative max-w-xl" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    className="py-4 pe-40 ps-6 w-full h-[50px] outline-none text-black dark:text-white rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-800"
                    placeholder={heroContent.ctaPlaceholder}
                  />
                  <motion.button
                    type="submit"
                    className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {heroContent.ctaButtonText}{" "}
                    <i className="uil uil-arrow-right"></i>
                  </motion.button>
                </form>
              </div>

              <span className="text-slate-400 font-medium">
                Procurando conhecer melhor?{" "}
                <a
                  href={heroContent.exploreDashboardLink}
                  className="text-indigo-600"
                >
                  {heroContent.exploreDashboardText}
                </a>{" "}
                para mais detalhes.
              </span>
            </div>
          </div>

          <div className="md:col-span-6">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-md dark:shadow-gray-800">
                <div
                  className="w-full py-72 bg-slate-400 bg-cover bg-no-repeat bg-left jarallax"
                  style={{
                    backgroundImage: `url(${heroContent.backgroundImage})`,
                  }}
                />
              </div>

              <motion.div
                className="absolute flex justify-between items-center md:bottom-10 bottom-5 md:-start-16 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 m-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-[65px] min-w-[65px] bg-indigo-600/5 text-indigo-600 text-center rounded-full me-3">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h6 className="text-slate-400 dark:text-white">
                      {heroContent.visitorsTitle}
                    </h6>
                    <p className="text-xl font-bold">
                      {heroContent.visitorsCount}
                    </p>
                    <p className="text-xs text-slate-400">
                      {heroContent.visitorsPeriod}
                    </p>
                  </div>
                </div>
                <span className="text-green-600">
                  <ArrowUp className="h-4 w-4" /> {heroContent.growthPercentage}
                </span>
              </motion.div>

              <motion.div
                className="absolute xl:top-20 top-40 xl:-end-20 lg:-end-10 -end-1 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 m-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h5 className="text-xl font-semibold mb-3">
                  {heroContent.inspireTitle}
                </h5>
                <div className="flex justify-between mt-3 mb-2">
                  <span className="text-slate-400">
                    {heroContent.satisfactionTitle}
                  </span>
                  <span className="text-slate-400">
                    {heroContent.satisfactionPercentage}
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                  <div
                    className="bg-indigo-600 h-[6px] rounded-full"
                    style={{ width: heroContent.satisfactionProgress }}
                  ></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
