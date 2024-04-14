"use client";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { CgMenu, CgClose } from "react-icons/cg";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";

const LoggedOutNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef();

  return (
    <>
      <header className="mobile:hidden desktop:block text-gray-600 p-0 max-w-6xl m-auto">
        <div
          className="mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center"
          bis_skin_checked={1}
        >
          <Link
            href="/"
            className="flex font-medium items-center text-black mb-4 md:mb-0"
          >
            <Image
              width="900"
              height="900"
              src="/logo.png"
              className="h-24 w-24"
              alt="Logo"
            />
          </Link>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-10 mr-">
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "mr-5  text-xl font-semibold text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                  : "mr-5  text-xl text-black font-semibold  hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
              }
            >
              Home
            </Link>

            <Link
              href="/portfolio"
              className={
                pathname === "/portfolio"
                  ? "mr-5  text-xl font-semibold text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                  : "mr-5  text-xl text-black font-semibold  hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
              }
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className={
                pathname === "/about"
                  ? "mr-5  text-xl font-semibold text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                  : "mr-5  text-xl text-black font-semibold  hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
              }
            >
              About
            </Link>
            <Link
              href="/contact"
              className={
                pathname === "/contact"
                  ? "mr-5  text-xl font-semibold text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                  : "mr-5  text-xl text-black font-semibold  hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
              }
            >
              Contact
            </Link>

            <Link
              href="/book-appointment"
              className={
                pathname === "/book-appointment"
                  ? "mr-5  text-xl font-semibold text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                  : "mr-5  text-xl text-black font-semibold  hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
              }
            >
              Book Apointment
            </Link>

            <Button className="m-0 p-0">
              <LoginLink
                className={
                  pathname === "/admin/dashboard"
                    ? "h-9 px-4 py-2 rounded-[4px] underline"
                    : "h-9 px-4 py-2 rounded-[4px] hover:underline transition-all duration-150 ease-in-out"
                }
              >
                Admin Login
              </LoginLink>
            </Button>
          </nav>
        </div>
      </header>

      {/* MOBILE  */}

      <header className="mobile:block desktop:hidden">
        <div className="pt-3 mb-5">
          <div className="max-w-5xl  mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    href="/"
                    className="flex font-bold items-center text-black  md:mb-0"
                  >
                    <Image
                      width="900"
                      height="900"
                      src="/logo.png"
                      className="h-24 w-24"
                      alt="Logo"
                    />
                  </Link>
                </div>
              </div>

              <div className="-mr-2 flex">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <CgMenu
                      size={25}
                      color="black"
                      className="object-contain font-bold"
                    />
                  ) : (
                    <CgClose
                      size={25}
                      color="black"
                      className="object-contain font-bold"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100  "
            enterFrom="opacity-0 scale-95 "
            enterTo="opacity-100 scale-100 "
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95 "
          >
            {() => (
              <nav className="desktop:hidden" id="mobile-menu">
                <div
                  ref={ref}
                  className=" px-2 pt-2 pb-20 mt-5 gap-6 sm:px-3 flex justify-center items-center flex-col"
                >
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={
                      pathname === "/"
                        ? "text-blue-500 block px-3 py-2 rounded-md text-lg font-bold hover:underline"
                        : "text-black block px-3 py-2 rounded-md text-lg font-bold hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                    }
                  >
                    Home
                  </Link>

                  <Link
                    href="/portfolio"
                    onClick={() => setIsOpen(false)}
                    className={
                      pathname === "/portfolio"
                        ? "text-blue-500 block px-3 py-2 rounded-md text-lg font-bold hover:underline"
                        : "text-black block px-3 py-2 rounded-md text-lg font-bold hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                    }
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className={
                      pathname === "/about"
                        ? "text-blue-500 block px-3 py-2 rounded-md text-lg font-bold hover:underline"
                        : "text-black block px-3 py-2 rounded-md text-lg font-bold hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                    }
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className={
                      pathname === "/contact"
                        ? "text-blue-500 block px-3 py-2 rounded-md text-lg font-bold hover:underline"
                        : "text-black block px-3 py-2 rounded-md text-lg font-bold hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                    }
                  >
                    Contact
                  </Link>
                  <Link
                    href="/book-appointment"
                    onClick={() => setIsOpen(false)}
                    className={
                      pathname === "/book-appointment"
                        ? "text-blue-500 block px-3 py-2 rounded-md text-lg font-bold hover:underline"
                        : "text-black block px-3 py-2 rounded-md text-lg font-bold hover:text-blue-500 hover:underline transition-all duration-150 ease-in-out"
                    }
                  >
                    Book Appointment
                  </Link>

                  <Button className="p-0">
                    <LoginLink
                      className={
                        pathname === "/admin/dashboard"
                          ? "h-9 px-4 py-2 rounded-[4px] underline"
                          : "h-9 px-4 py-2 rounded-[4px] hover:underline transition-all duration-150 ease-in-out"
                      }
                    >
                      Admin Login
                    </LoginLink>
                  </Button>
                </div>
              </nav>
            )}
          </Transition>
        </div>
      </header>
    </>
  );
};

export default LoggedOutNavbar;
