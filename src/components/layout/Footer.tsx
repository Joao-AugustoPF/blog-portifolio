"use client";

import React, { useState } from "react";
import { Icons } from "@/components/commons/Icons";
import content from "@/app/content.json"; // Usando o caminho especificado

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { aboutUs, quickLinks, newsletter, socialLinks, copyrightText } =
    content.footer;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validateEmail(email)) {
      setStatusMessage(newsletter.validationMessage);
      return;
    }

    try {
      // Mocking API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatusMessage(newsletter.successMessage);
      setEmail(""); // Clear the input field after a successful subscription
    } catch (error) {
      setStatusMessage(newsletter.errorMessage);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  type IconName = "logo" | "twitter" | "gitHub" | "close";

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">{aboutUs.title}</h4>
          <p className="text-gray-400">{aboutUs.description}</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">{quickLinks.title}</h4>
          <ul className="space-y-2">
            {quickLinks.links.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-gray-400 hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">{newsletter.title}</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
            <input
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder={newsletter.inputPlaceholder}
              className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {newsletter.buttonText}
            </button>
          </form>
          {statusMessage && (
            <p className="mt-3 text-sm text-gray-400">{statusMessage}</p>
          )}
          <div className="mt-8 flex space-x-4">
            {socialLinks.map((link, index) => {
              const IconComponent = Icons[link.icon as IconName];
              return (
                <a key={index} href={link.href} aria-label={link.label}>
                  <IconComponent className="w-6 h-6 text-gray-400 hover:text-white" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
        &copy;{" "}
        {copyrightText.replace("{year}", new Date().getFullYear().toString())}
      </div>
    </footer>
  );
}
