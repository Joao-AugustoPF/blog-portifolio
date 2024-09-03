import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/components/forms/UserAuthForm";
import content from "@/app/content.json"; // Importing the JSON content

export const metadata: Metadata = {
  title: content.authenticationPage.title,
  description: content.authenticationPage.description,
};

export default function AuthenticationPage() {
  const { mobileViewImages, mainContent } = content.authenticationPage;

  return (
    <>
      {/* Mobile View Image */}
      <div className="md:hidden ">
        <Image
          src={mobileViewImages.light}
          width={1280}
          height={843}
          alt="Authentication"
          className="block bg-gray-100 dark:bg-gray-900"
        />
      </div>

      {/* Main Content */}
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center px-6 lg:px-0 space-y-8 lg:space-y-0 lg:space-x-8">
          {/* Left Image Section */}
          <div className="hidden lg:block lg:w-1/2">
            <Image
              src={mainContent.leftImage.src}
              width={mainContent.leftImage.width}
              height={mainContent.leftImage.height}
              alt={mainContent.leftImage.alt}
              className="rounded-lg"
            />
          </div>

          {/* Right Form Section */}
          <div className="w-full max-w-md lg:w-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                {mainContent.rightFormSection.heading}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {mainContent.rightFormSection.subHeading}
              </p>
            </div>
            <UserAuthForm />
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              {mainContent.rightFormSection.termsText}{" "}
              <Link
                href={mainContent.rightFormSection.termsLink}
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {mainContent.rightFormSection.termsLinkText}
              </Link>{" "}
              e{" "}
              <Link
                href={mainContent.rightFormSection.privacyLink}
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {mainContent.rightFormSection.privacyLinkText}
              </Link>
              .
            </p>
            <div className="mt-6 bg-yellow-100 text-yellow-800 text-sm text-center p-4 rounded-md">
              <strong>Nota:</strong> {mainContent.rightFormSection.note.text}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
