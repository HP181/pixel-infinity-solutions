"use client";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { CgMenu, CgClose } from "react-icons/cg";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const LoggedOutNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const ref = useRef();

  return (
    <>
      <header className="mobile:hidden desktop:block text-gray-600 body-font sticky p-0 z-20 bg-white">
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
              className="h-24 w-24 ml-4"
              alt="Logo"
            />
          </Link>

          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href="/"
              className="mr-5  text-xl text-black font-semibold  hover:text-blue-500"
            >
              Home
            </Link>

            <Link
              href="/portfolio"
              className="mr-5 hover:text-blue-500 text-xl text-black font-semibold"
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className="mr-5 hover:text-blue-500 text-xl text-black font-semibold"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="mr-5 hover:text-blue-500 text-xl text-black font-semibold"
            >
              About
            </Link>
          </nav>

          <section>
            <Button
              onClick={() => router.push("/book-apointment")}
              className="mr-4"
            >
              Book Apointment
            </Button>

            <Button className="mr-4 p-0">
              <LoginLink className="h-9 px-4 py-2 rounded-[4px]">
                Admin Login
              </LoginLink>
            </Button>
          </section>
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
              <nav className="md:hidden" id="mobile-menu">
                <div
                  ref={ref}
                  className=" px-2 pt-2 pb-20 gap-6 xxs:pb-32 sm:px-3 flex justify-center items-center flex-col h-[100vh]"
                >
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className=" text-black block px-3 py-2 rounded-md text-lg font-bold"
                  >
                    Home
                  </Link>

                  <Link
                    href="/portfolio"
                    onClick={() => setIsOpen(false)}
                    className="text-black block px-3 py-2 rounded-md text-lg font-bold"
                  >
                    Portfolio
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="text-black  block px-3 py-2 rounded-md text-lg font-bold"
                  >
                    Contact
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="text-black block px-3 py-2 rounded-md text-lg font-bold"
                  >
                    About
                  </Link>
                  <Button
                    onClick={() => router.push("/book-apointment")}
                    className="mr-4"
                  >
                    Book Apointment
                  </Button>

                  <Button className="mr-4 p-0">
                    <LoginLink className="h-9 px-4 py-2 rounded-[4px]">
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
