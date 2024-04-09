"use client";

import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { Popover, Transition } from "@headlessui/react";
import { BiChevronRight } from "react-icons/bi";
import { CgMenu, CgClose } from "react-icons/cg";

import { Fragment } from "react";
import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const ref = useRef();
  

  return (
    <>
      <header className="hidden sm:block text-gray-600 body-font sticky hrefp-0 z-20 bg-white">
        <div
          className=" container mx-auto  flex-wrap flex  p-3 flex-col md:flex-row items-center"
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
              alt=""
            />
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              href="/"
              className="mr-5  text-xl text-black font-semibold  hover:text-blue-500"
            >
              Home
            </Link>

            <Link href="#" className="mr-5  text-xl text-black font-bold">
              <div>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-black px-3 py-2  font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span className="font-semibold text-black ">
                          Solutions
                        </span>
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute  z-10 mt-3 w-52 left-7 sm:left-28 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                          <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-4 bg-white p-4 lg:grid-cols-1">
                              <Link
                                href="#"
                                className="p-0 flex items-center rounded-lg  transition duration-150 ease-in-out  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <ul className="w-full flex flex-col justify-center items-center gap-y-3 p-3">
                                  <div className="flex justify-center items-center hover:bg-gray-50">
                                    <span>
                                      <BiChevronRight className="inline text-blue-500" />
                                    </span>
                                    <p className="text-sm  text-gray-900 text-center font-semibold">
                                      WEBSITE DEVELOPEMENT
                                    </p>
                                  </div>

                                  <div className="flex justify-center items-center hover:bg-gray-50">
                                    <span>
                                      <BiChevronRight className="inline text-blue-500" />
                                    </span>
                                    <p className="text-sm  text-gray-900 text-center font-semibold">
                                      WEBSITE DESIGNING
                                    </p>
                                  </div>

                                  <div className="flex justify-center items-center hover:bg-gray-50">
                                    <span>
                                      <BiChevronRight className="inline text-blue-500" />
                                    </span>
                                    <p className="text-sm  text-gray-900 text-center  font-semibold">
                                      SOFTWARE DEVELOPEMENT
                                    </p>
                                  </div>

                                  <div className="flex justify-center items-center hover:bg-gray-50">
                                    <span>
                                      <BiChevronRight className="inline text-blue-500" />
                                    </span>
                                    <p className="text-sm  text-gray-900 text-center font-semibold">
                                      E-COMMERCE DEVELOPEMENT
                                    </p>
                                  </div>
                                </ul>
                              </Link>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </Link>

            <Link
              href="#"
              className="mr-5 hover:text-blue-500 text-xl text-white font-bold"
            >
              <div>
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-black px-3 py-2  font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                      >
                        <span className="font-semibold text-black ">
                          Technologies
                        </span>
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute  z-10 mt-3 w-72 xs:left-32    sm:left-28 max-w-sm -translate-x-1/2 transform px-4 sm:px-0  lg:max-w-3xl">
                          <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-4 bg-white p-4 lg:grid-cols-1 scrollbar-hide">
                              {/* 1 */}
                              <Link
                                href="#"
                                className="p-0 flex items-center rounded-lg  transition duration-150 ease-in-out  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              >
                                <div className="w-full grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2  h-72 overflow-scroll scrollbar-hide place-items-center text-black gap-y-8 ">
                                  <div className=" ">
                                    <h1 className="text-center text-base">
                                      FRONTEND TECHNOLOGIES
                                    </h1>

                                    <div className="flex flex-col justify-center items-center text-sm gap-y-1  sm:mt-0">
                                      <p className="font-semibold">REACT</p>
                                      <p className="font-semibold">ANGULAR</p>
                                      <p className="font-semibold">NEXT JS</p>
                                    </div>
                                    {/* </div> */}
                                  </div>

                                  <div>
                                    <h1 className="text-center text-base ">
                                      BACKEND TECHNOLOGIES
                                    </h1>

                                    <div className="flex flex-col justify-center items-center  text-sm gap-y-1 mt-2 sm:mt-0">
                                      <p className="font-semibold">NODE JS</p>
                                      <p className="font-semibold">
                                        EXPRESS JS
                                      </p>
                                      <p className="font-semibold">&nbsp;</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h1 className="text-center text-base">
                                      DATABASE
                                    </h1>

                                    <div className="flex flex-col justify-center items-center  text-sm gap-y-1 mt-2 sm:mt-0">
                                      <p className="font-semibold">FIREBASE</p>
                                      <p className="font-semibold">MONGO DB</p>
                                      <p className="font-semibold">
                                        POSTGRESQL
                                      </p>
                                      <p className="font-semibold">SQLITE</p>
                                      <p className="font-semibold">MYSQL</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h1 className="text-center text-base">
                                      FRAMEWORKS
                                    </h1>

                                    <div className="flex flex-col justify-center items-center text-sm gap-y-1 mt-2  sm:mt-0">
                                      <p className="font-semibold">
                                        TAILWIND CSS
                                      </p>
                                      <p className="font-semibold">
                                        MATERIAL UI
                                      </p>
                                      <p className="font-semibold">BOOTSTRAP</p>
                                      <p className="font-semibold">&nbsp;</p>
                                      <p className="font-semibold">&nbsp;</p>
                                    </div>
                                  </div>
                                  <div className="mb-6">
                                    <h1 className="text-center text-base">
                                      TESTING LIBRARY
                                    </h1>
                                    <div className="flex flex-col justify-center items-center  text-sm gap-y-1 mt-2 sm:mt-0">
                                      <p className="font-semibold">JEST</p>
                                      <p className="font-semibold text-center">
                                        REACT TESTING LIBRARY
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
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
          <Button onClick={() => router.push('/book-apointment')} className="mr-4">Book Apointment</Button>

          <LogoutLink className="bg-black px-3 py-2 text-white rounded-lg">
        Admin Logout
      </LogoutLink>
        
       
        </div>
      </header>

      {/* MOBILE  */}

      <div className="block  sm:hidden">
        <nav className="">
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
                      className="h-20 w-20"
                      alt=""
                    />
                  </Link>
                </div>
              </div>

              <div className="-mr-2 flex ">
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
              <div className="md:hidden" id="mobile-menu">
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

                  <div className="block px-3 py-2 rounded-md text-lg font-bold">
                    <Link
                      href="#"
                      className=" hover:text-blue-500 text-xl text-black font-bold"
                    >
                      <div>
                        <Popover className="relative">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-black px-3 py-2  font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                              >
                                <span className="text-black block rounded-md text-lg font-bold">
                                  Solutions
                                </span>
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute  z-10 top-16 w-72 left-10  max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl ">
                                  <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-4 bg-white p-4 lg:grid-cols-1">
                                      <Link
                                        href="#"
                                        className="p-0 flex items-center rounded-lg  transition duration-150 ease-in-out  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <ul className="w-full flex flex-col justify-center items-center gap-y-3 p-3">
                                          <div className="flex justify-center items-center hover:bg-gray-50">
                                            <span>
                                              <BiChevronRight className="inline text-blue-500 " />
                                            </span>
                                            <p className="text-sm  text-gray-900 text-center font-semibold">
                                              WEBSITE DEVELOPEMENT
                                            </p>
                                          </div>

                                          <div className="flex justify-center items-center hover:bg-gray-50">
                                            <span>
                                              <BiChevronRight className="inline text-blue-500" />
                                            </span>
                                            <p className="text-sm  text-gray-900 text-center  font-semibold">
                                              WEBSITE DESIGNING
                                            </p>
                                          </div>

                                          <div className="flex justify-center items-center hover:bg-gray-50">
                                            <span>
                                              <BiChevronRight className="inline text-blue-500" />
                                            </span>
                                            <p className="text-sm  text-gray-900 text-center  font-semibold">
                                              SOFTWARE DEVELOPEMENT
                                            </p>
                                          </div>

                                          <div className="flex justify-center items-center hover:bg-gray-50">
                                            <span>
                                              <BiChevronRight className="inline text-blue-500" />
                                            </span>
                                            <p className="text-sm  text-gray-900 text-center font-semibold">
                                              E-COMMERCE DEVELOPEMENT
                                            </p>
                                          </div>
                                        </ul>
                                      </Link>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </div>
                    </Link>
                  </div>

                  <div className="block px-3 py-2 rounded-md text-base font-medium">
                    {/* Here mobile technology  */}

                    <Link href="#" className=" text-xl text-black font-bold">
                      <div>
                        <Popover className="relative">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md text-black px-3 py-2  font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                              >
                                <span className=" text-black block rounded-md text-lg font-bold">
                                  Technologies
                                </span>
                              </Popover.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel className="absolute  z-10 mt-3 w-80  xs:left-14 xs:top-8 xxs:left-14 xxs:top-12 xxs:w-96 sm:left-28 max-w-sm -translate-x-1/2 transform px-4 sm:px-0  lg:max-w-3xl ">
                                  <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
                                    <div className="relative grid gap-4 bg-white xs:h-48 xxs:h-60  p-4 lg:grid-cols-1">
                                      {/* 1 */}
                                      <Link
                                        href="#"
                                        className="p-0 flex items-center rounded-lg  transition duration-150 ease-in-out  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                      >
                                        <div className="w-full grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2  h-72 overflow-scroll scrollbar-hide place-items-center text-black gap-y-8 ">
                                          <div className=" ">
                                            <h1 className="text-center text-base">
                                              FRONTEND TECHNOLOGIES
                                            </h1>

                                            <div className="flex flex-col justify-center items-center text-sm gap-y-1  sm:mt-0">
                                              <p className="font-semibold">
                                                REACT
                                              </p>
                                              <p className="font-semibold">
                                                ANGULAR
                                              </p>
                                              <p className="font-semibold">
                                                NEXT JS
                                              </p>
                                            </div>
                                          </div>

                                          <div>
                                            <h1 className="text-center text-base ">
                                              BACKEND TECHNOLOGIES
                                            </h1>

                                            <div className="flex flex-col justify-center items-center  text-sm gap-y-1 mt-2 sm:mt-0">
                                              <p className="font-semibold">
                                                NODE JS
                                              </p>
                                              <p className="font-semibold">
                                                EXPRESS JS
                                              </p>
                                              <p className="font-semibold">
                                                &nbsp;
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <h1 className="text-center text-base">
                                              DATABASE
                                            </h1>

                                            <div className="flex flex-col justify-center items-center  text-sm gap-y-1 mt-2 sm:mt-0">
                                              <p className="font-semibold">
                                                FIREBASE
                                              </p>
                                              <p className="font-semibold">
                                                MONGO DB
                                              </p>
                                              <p className="font-semibold">
                                                POSTGRESQL
                                              </p>
                                              <p className="font-semibold">
                                                SQLITE
                                              </p>
                                              <p className="font-semibold">
                                                MYSQL
                                              </p>
                                            </div>
                                          </div>
                                          <div>
                                            <h1 className="text-center text-base">
                                              FRAMEWORKS
                                            </h1>

                                            <div className="flex flex-col justify-center items-center text-sm gap-y-1 mt-2  sm:mt-0">
                                              <p className="font-semibold">
                                                TAILWIND CSS
                                              </p>
                                              <p className="font-semibold">
                                                MATERIAL UI
                                              </p>
                                              <p className="font-semibold">
                                                BOOTSTRAP
                                              </p>
                                              <p className="font-semibold">
                                                &nbsp;
                                              </p>
                                              <p className="font-semibold">
                                                &nbsp;
                                              </p>
                                            </div>
                                          </div>
                                          <div className="xs:pb-32 xs:-mt-6  xxs:pb-20 xxs:-mt-6">
                                            <h1 className="text-center text-base">
                                              TESTING LIBRARY
                                            </h1>

                                            <div className="flex flex-col justify-center items-center  text-sm gap-y-1 mt-2 sm:mt-0">
                                              <p className="font-semibold">
                                                JEST
                                              </p>
                                              <p className="font-semibold text-center">
                                                REACT TESTING LIBRARY
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </div>
                    </Link>
                  </div>

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
                  <Button onClick={() => router.push('/book-apointment')} className="mr-4">Book Apointment</Button>

                  <LogoutLink className="bg-black px-10 py-2 text-white rounded-lg">
        Admin Logout
      </LogoutLink>
                </div>
              </div>
            )}
          </Transition>
        </nav>

        {/* <main className="bg-red-400">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"></div>
        </main> */}
      </div>
    </>
  );
};

export default Navbar;
