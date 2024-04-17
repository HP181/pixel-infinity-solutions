"use client";

import React, { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import createAppointments from "@/action/createAppointments";

const BookAppointment = () => {
  const [startDate, setStartDate] = useState(new Date());
  const ref = useRef();

  function Submit() {
    const { pending } = useFormStatus();

    return (
      <button
        type="submit"
        disabled={pending}
        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:cursor-wait disabled:bg-indigo-300"
      >
        {" "}
        {pending ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        ) : (
          "Submit"
        )}{" "}
      </button>
    );
  }

  return (
    <div className="max-w-6xl m-auto mb-12 bg-[#f3f4f6] dark:bg-[#1d2432] rounded-lg">
      <div className="p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Book An Appointment with <br />
          <span className="text-3xl font-bold mb-4">PixelInfinity</span>
        </h2>

        <div className=" grid grid-rows-1 place-items-center  mt-10 gap-6 sm:grid-cols-3 sm:place-items-start">
          <div>
            <h1 className="text-center font-semibold text-[#cccccc] sm:text-left">
              Address
            </h1>
            <p className="text-center sm:text-left">59 Hayden St Unit</p>
            <p className="text-center sm:text-left">400, Toronto, ON</p>
            <p className="text-center sm:text-left">M4Y 2P2</p>
          </div>
          <div>
            <p className="text-center font-semibold text-[#cccccc] sm:text-left">
              EMAIL:
            </p>
            <Link href="mailto:pixelinfitity@gmail.com">
              pixelinfitity@gmail.com
            </Link>
          </div>
          <div className="m-0 sm:ml-10">
            <p className="text-center font-semibold text-[#cccccc] sm:text-left">
              PHONE:
            </p>
            <p>+ 1235 2355 98</p>
          </div>
        </div>
        <form
          type="submit"
          ref={ref}
          action={async (formData, e) => {
            const { message, status, error } = await createAppointments(
              formData,
              e
            );

            if (error || status !== 201) {
              ref.current.reset();
              return toast.error(error);
            }

            ref.current.reset();
            return toast.success(message);
          }}
          className="flex flex-wrap -m-2 mt-8"
        >
          <div className="p-2 w-full sm:w-1/2">
            <div className="relative">
              <label
                htmlFor="name"
                className="leading-7 text-sm text-gray-600 dark:text-gray-200"
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
          <div className="p-2 w-full sm:w-1/2">
            <div className="relative">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600 dark:text-gray-200"
              >
                <p>
                  Email <span className="text-red-500">*</span>
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

          <div className="p-2 w-full sm:w-1/2">
            <div className="relative flex flex-col ">
              <label
                htmlFor="date"
                className="leading-7 text-sm text-gray-600 dark:text-gray-200"
              >
                <p>
                  Appointment <span className="text-red-500">*</span>
                </p>
              </label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                name="date"
                value={startDate}
                className="w-[100%] dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out"
                minDate={new Date()}
                required
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date For Appointment"
                id="appointment"
              />
            </div>
          </div>

          <div className="p-2 w-full sm:w-1/2">
            <div className="relative">
              <label
                htmlFor="subject"
                className="leading-7 text-sm text-gray-600 dark:text-gray-200"
              >
                <p>
                  Subject <span className="text-red-500">*</span>
                </p>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out"
              />
            </div>
          </div>

          <div className="p-2 w-full">
            <div className="relative">
              <label
                htmlFor="desc"
                className="leading-7 text-sm text-gray-600 dark:text-gray-200"
              >
                <p>
                  Short Description <span className="text-red-500">*</span>
                </p>
              </label>
              <textarea
                id="message"
                name="desc"
                required
                className="w-full dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 duration-200 ease-in-out h-32"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <Submit />
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
      </div>
    </div>
  );
};

export default BookAppointment;
