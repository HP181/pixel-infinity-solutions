"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const Contact = () => {
  const [Data, setData] = useState({ name: "", email: "", message: "" });
  const [Disable, setDisable] = useState(false);

  const handleInput = (e) => {
    let name, value;

    e.preventDefault();
    name = e.target.name;
    value = e.target.value;

    setData({ ...Data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDisable(true);

    const notification = toast.loading("Loading...");

    const data = await fetch("/api/contact", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Data.name,
        email: Data.email,
        message: Data.message,
      }),
    });
    
    const res = await data.json();
    
    if (data?.status !== 201) {
      setDisable(false);
      setData({ name: "", email: "", message: "" });
      return toast.error(res.error, { id: notification });
    }

    setDisable(false);
    setData({ name: "", email: "", message: "" });
    return toast.success(res.message, { id: notification });
  };

  return (
    <div className="xxs:mt-10">
      <section className="text-gray-600 body-font bg-slate-50 relative ">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-3/3 mx-auto leading-relaxed text-indigo-500 text-base">
              Any Questions.We would to hear from you.
            </p>
          </div>
          <div className=" xs:w-full lg:w-1/2 md:w-2/3 mx-auto">
            <form
              type="submit"
              onSubmit={handleSubmit}
              className="flex flex-wrap -m-2"
            >
              <div className="p-2 xs:w-full xxs:w-1/2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={Data.name}
                    onChange={handleInput}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 xs:w-full  xxs:w-1/2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    <span className="pt-44">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={Data.email}
                    onChange={handleInput}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={Data.message}
                    onChange={handleInput}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:cursor-wait disabled:bg-indigo-300"
                  disabled={Disable}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
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
                  <Link href="#" className="text-gray-500">
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

                  <Link href="#" className="ml-4 text-gray-500">
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
                  <Link href="#" className="ml-4 text-gray-500">
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
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
