"use client";

import React from "react";
import content from "@/app/content.json"; // Importa o JSON

export default function TermsOfService() {
  const termsOfService = content.termsOfService;

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            {termsOfService.pageTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {termsOfService.lastUpdated}
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          {termsOfService.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {section.content.includes("{email}")
                  ? section.content.split("{email}").map((part, i, arr) =>
                      i < arr.length - 1 ? (
                        <React.Fragment key={i}>
                          {part}
                          <strong>{termsOfService.email}</strong>
                        </React.Fragment>
                      ) : (
                        part
                      )
                    )
                  : section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
