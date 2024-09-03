"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import content from "@/app/content.json"; // Usando o caminho especificado

export default function NewsletterSection() {
  const [email, setEmail] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const {
    heading,
    description,
    inputPlaceholder,
    buttonText,
    validationMessage,
    successMessage,
    errorMessage,
  } = content.newsletterSection;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validateEmail(email)) {
      setStatusMessage(validationMessage);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatusMessage(successMessage);
      setEmail(""); // Clear input field after successful subscription
    } catch (error) {
      setStatusMessage(errorMessage);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <motion.section
      className="py-16 px-6 md:px-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="container mt-16 md:mt-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">{heading}</h3>
          <p className="text-slate-400 max-w-xl mx-auto">{description}</p>
          <div className="mt-8">
            <form
              onSubmit={handleSubscribe}
              className="relative mx-auto max-w-xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
              >
                <Input
                  type="email"
                  id="subemail"
                  name="email"
                  className="w-full h-[50px] px-6 py-4 rounded-full bg-white/70 dark:bg-slate-900/70 border border-gray-100 dark:border-gray-700 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder={inputPlaceholder}
                  value={email}
                  onChange={handleInputChange}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
              >
                <Button
                  type="submit"
                  className="absolute right-3 top-[2px] h-[46px] px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition duration-500"
                >
                  {buttonText}
                </Button>
              </motion.div>
            </form>
            {statusMessage && (
              <motion.p
                className="mt-4 text-sm text-red-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {statusMessage}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
