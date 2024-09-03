"use client";

import React, { useState } from "react";
import content from "@/app/content.json"; // Importando o JSON

export default function ContactPage() {
  const {
    heading,
    formLabels,
    formPlaceholders,
    buttonText,
    validationError,
    successMessage,
    errorMessage,
    image,
  } = content.contactPage;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    comments: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateForm = (): boolean => {
    if (
      !formState.name ||
      !formState.email ||
      !formState.subject ||
      !formState.comments
    ) {
      setError(validationError);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setError(null);
      alert(successMessage);
      setFormState({ name: "", email: "", subject: "", comments: "" });
    } catch (error) {
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto p-6">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-8">
          <div className="md:col-span-6">
            <img src={image.src} alt={image.alt} className="w-full h-auto" />
          </div>

          <div className="md:col-span-6">
            <div className="bg-white dark:bg-slate-900 rounded-md shadow-lg p-6">
              <h3 className="text-2xl font-medium mb-6">{heading}</h3>

              {error && <p className="text-red-600 mb-4">{error}</p>}

              <form onSubmit={handleSubmit} id="contactForm">
                <div className="grid md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-semibold text-gray-700 dark:text-gray-200"
                    >
                      {formLabels.name}
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="form-input pl-3 py-2 w-full rounded-md bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:border-indigo-600 focus:ring-0"
                        placeholder={formPlaceholders.name}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-semibold text-gray-700 dark:text-gray-200"
                    >
                      {formLabels.email}
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="form-input pl-3 py-2 w-full rounded-md bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:border-indigo-600 focus:ring-0"
                        placeholder={formPlaceholders.email}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="block font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {formLabels.subject}
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      className="form-input pl-3 py-2 w-full rounded-md bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:border-indigo-600 focus:ring-0"
                      placeholder={formPlaceholders.subject}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="comments"
                    className="block font-semibold text-gray-700 dark:text-gray-200"
                  >
                    {formLabels.comments}
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      name="comments"
                      id="comments"
                      value={formState.comments}
                      onChange={handleInputChange}
                      className="form-input pl-3 py-2 w-full h-28 rounded-md bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:border-indigo-600 focus:ring-0"
                      placeholder={formPlaceholders.comments}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-5 font-semibold tracking-wide bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  {buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
