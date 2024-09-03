"use client";

import React from "react";
import content from "@/app/content.json"; // Importa o JSON

export default function PrivacyPolicy() {
  const privacyPolicy = content.privacyPolicy;

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            {privacyPolicy.sectionTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {privacyPolicy.introduction.content}
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {privacyPolicy.informationWeCollect.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {privacyPolicy.informationWeCollect.content}
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6">
            {privacyPolicy.informationWeCollect.listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {privacyPolicy.informationWeCollect.additionalContent}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {privacyPolicy.security.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {privacyPolicy.security.content}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {privacyPolicy.retention.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {privacyPolicy.retention.content}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {privacyPolicy.yourRights.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {privacyPolicy.yourRights.content}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {privacyPolicy.changesToPolicy.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {privacyPolicy.changesToPolicy.content}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {privacyPolicy.contactUs.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {privacyPolicy.contactUs.content}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>{privacyPolicy.contactUs.contactDetails.emailLabel}</strong>{" "}
            {privacyPolicy.contactUs.contactDetails.email}
          </p>
        </div>
      </div>
    </section>
  );
}
