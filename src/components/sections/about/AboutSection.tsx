"use client";

import React from "react";
import { motion } from "framer-motion";
import content from "@/app/content.json"; // Usando o caminho especificado

export const AboutSection: React.FC = () => {
  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const { experience, heading, description, contactButton } =
    content.aboutSection;

  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-12">
          <motion.div
            className="md:col-span-6 lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
              <div className="col-span-6">
                <motion.div variants={imageVariants}>
                  <img
                    src="/ab03.jpg"
                    className="shadow rounded-md"
                    alt="About Us Image 1"
                  />
                </motion.div>
                <motion.div
                  variants={imageVariants}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src="/ab02.jpg"
                    className="shadow rounded-md mt-4"
                    alt="About Us Image 2"
                  />
                </motion.div>
              </div>

              <div className="col-span-6">
                <motion.div
                  variants={imageVariants}
                  transition={{ delay: 0.4 }}
                >
                  <img
                    src="/ab01.jpg"
                    className="shadow rounded-md"
                    alt="About Us Image 3"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-6 lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            variants={textVariants}
          >
            <div className="lg:ml-5">
              <div className="flex mb-4">
                <span className="text-indigo-600 text-2xl font-bold mb-0">
                  <span className="counter-value text-6xl font-bold">
                    {experience.years}
                  </span>
                  +
                </span>
                <span className="self-end font-medium ml-2">
                  {experience.label.split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                      {word} <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>

              <h3 className="mb-6 text-2xl md:text-3xl font-semibold leading-normal md:leading-normal">
                {heading}
              </h3>

              <p className="text-slate-400 max-w-xl">{description}</p>

              <div className="mt-6">
                <a
                  href={contactButton.href}
                  className="inline-block py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mr-2 mt-2"
                >
                  <i className={contactButton.iconClass}></i>{" "}
                  {contactButton.text}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
