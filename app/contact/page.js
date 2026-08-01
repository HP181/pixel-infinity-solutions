"use client";

import React, { useRef } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_CONTACT = gql`
  mutation CreateContact(
    $name: String!
    $email: String!
    $message: String!
  ) {
    createContact(name: $name, email: $email, message: $message) {
      message
      status
      error
    }
  }
`;

const Contact = () => {
  const ref = useRef();

  const [createContact, { loading: pending }] = useMutation(CREATE_CONTACT, {
    onCompleted: ({ createContact: result }) => {
      if (result.error || result.status !== 201) {
        ref.current.reset();
        toast.error(result.error);
      } else {
        ref.current.reset();
        toast.success(result.message);
      }
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createContact({
      variables: {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      },
    });
  };

  return (
    <div className="mt-10 max-w-6xl m-auto">
      <section className="text-gray-600 body-font rounded-lg relative ">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h1>
            <p className="lg:w-3/3 mx-auto leading-relaxed text-indigo-500 text-base">
              Any Questions.We would to hear from you.
            </p>
          </div>
          <div className="max-w-xl mx-auto">
            <form
              ref={ref}
              onSubmit={handleSubmit}
              className="flex flex-col -m-2"
            >
              <div className="p-2 w-full">
                <div className="">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-200 w-28"
                  >
                    <p>
                      Name<span className="text-red-500">*</span>
                    </p>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative ">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-200 w-28"
                  >
                    <p>
                      Email<span className="text-red-500">*</span>
                    </p>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative ">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600 dark:text-gray-200 w-28"
                  >
                    <p>
                      Message<span className="text-red-500">*</span>
                    </p>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out h-32"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  type="submit"
                  disabled={pending}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:cursor-wait disabled:bg-indigo-300"
                >
                  {pending ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <Link href="#" className="text-indigo-500">
                hit98987@gmail.com
              </Link>
              <p className="leading-normal my-5 text-indigo-500">
                Toronto Ontario <br />
                Canada
                <br />
                +1 (437) 556-7042
              </p>
              <span className="inline-flex">
                <Link href="https://www.facebook.com" className="text-gray-500" target="_blank" rel="noopener noreferrer">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </Link>

                <Link href="https://www.instagram.com" className="ml-4 text-gray-500" target="_blank" rel="noopener noreferrer">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                  </svg>
                </Link>
                <Link href="https://signal.org" className="ml-4 text-gray-500" target="_blank" rel="noopener noreferrer">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
