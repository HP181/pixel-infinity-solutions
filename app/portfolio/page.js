"use client"
// import { Popover, Transition } from "@headlessui/react";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

const Portfolio = () => {
  return (
    <>
      <div className="m-2  ">
        <p className=" xs:text-center xxs:text-center  sm:text-center md:text-center md:mt-20 md:mb-10 text-4xl lg:hidden  text-indigo-500 font-bold sm:mb-5 sm:mt-16 xs:text-3xl">
          MEGA STORE
        </p>

        <div className="h-[50vh] md:mt-16 flex xs:flex-col xs:justify-between  md:justify-around  gap-96  items-center  w-full xs:-mt-6 ">
          <div className="mt-16 w-full lg:flex lg:justify-around lg:items-center xl:flex xl:justify-around xl:items-center   ">
            <p className="hidden lg:block text-4xl font-bold text-indigo-500 ">
              MEGA STORE
            </p>

            <Popover className="">
              {({ open }) => (
                <>
                  <div className="flex items-center justify-center w-[90vw] xs:w-full xxs:w-full xs:flex-1 xxs:flex-1 sm:flex-1 md:flex-1 lg:w-[47em]   mx-auto ">
                    <Popover.Button
                      className={`
        ${open ? "" : "text-opacity-90"}
        group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-gray-200 relative xs:h-full xs:w-screen flex-1 w-[90vw] md:h-[25em] md:w-[40em]  md:justify-center md:items-center lg:h-[25em] lg:w-[46em]  xl:h-[25em] xl:w-[41em] `}
                    >
                      <Image width="900" height="900"
                        src="/pictures/ECOMMERCE/1.png"
                        className="xs:h-full xs:w-full  md:w-full md:h-full     lg:h-[58vh] lg:w-[58vw] xl:w-82 xl:h-82  object-contain transform hover:scale-105 duration-500 ease-in-out flex-1     "
                        alt="/bg.png"
                      ></Image>
                      {/* {window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} */}
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-[53vw]  scroll-m-0 z-10 mt-1 w-screen max-w-2xl xs:top-44 xs:max-w-[90vw] xs:left-[10em] xxs:top-44 xxs:mx-auto sm:max-w-lg sm:mx-auto sm:top-80  md:max-w-2xl md:mx-auto md:left-[25em] md:top-44 lg:max-w-4xl lg:mx-auto lg:top-28 lg:left-[32em] xl:max-w-5xl xl:mx-auto xl:-right-[35em] xl:top-32 -translate-x-1/2 transform px-4 sm:px-0 bg-cyan-100  top-16 overflow-hidden ">
                      {/* {window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} */}

                      <div className=" h-full overflow-scroll scrollbar-hide scroll-m-0 bg-scroll rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 pt-6 mb-6  xl:ml-6">
                        <div className="relative grid  lg:grid-cols-1">
                          <Image width="900" height="900"
                            src="/pictures/ECOMMERCE/1.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/ECOMMERCE/2.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/ECOMMERCE/3.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/ECOMMERCE/4.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>

      <div className="m-2 xs:mt-20 xxs:mt-32 sm:pt-32 md:pt-28 xl:pt-32   ">
        <p className="xs:text-center xxs:text-center sm:text-center md:text-center md:mt-20 md:mb-10 text-4xl lg:hidden  text-indigo-500 font-bold sm:mb-5 xs:text-3xl ">
          Food Corner
        </p>

        <div className="h-[50vh] md:mt-16 flex xs:flex-col xs:justify-between  md:justify-around  gap-96  items-center w-full xs:-mt-6 ">
          <div className="mt-16 w-full lg:flex lg:justify-around lg:items-center xl:flex xl:justify-around xl:items-center   ">
            <Popover className="">
              {({ open }) => (
                <>
                  <div className="flex items-center justify-center w-[90vw] xs:w-full xxs:w-full xs:flex-1 xxs:flex-1 sm:flex-1 md:flex-1 lg:w-[47em]   mx-auto ">
                    <Popover.Button
                      className={`
              ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-gray-200 relative xs:h-full xs:w-screen flex-1 w-[90vw] md:h-[25em] md:w-[40em]  md:justify-center md:items-center lg:h-[25em] lg:w-[46em]  xl:h-[25em] xl:w-[41em]`}
                    >
                      <Image width="900" height="900"
                        src="/pictures/RESTAURANT/bg.png"
                        className="xs:h-full xs:w-full  md:w-full md:h-full lg:h-[55vh] lg:w-[55vw] xl:w-82 xl:h-82  object-contain transform hover:scale-105 duration-500 ease-in-out flex-1      "
                        alt="/bg.png"
                      ></Image>
                      {/* {window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} */}
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-[53vw]  scroll-m-0 z-10 mt-1 w-screen max-w-2xl xs:top-44 xs:max-w-[90vw] xs:left-[10em] xxs:top-44 xxs:mx-auto sm:max-w-lg sm:mx-auto sm:top-80  md:max-w-2xl md:mx-auto md:left-[25em] md:top-44 lg:max-w-4xl lg:mx-auto lg:top-28 lg:left-[32em] xl:max-w-5xl xl:mx-auto xl:-right-[35em] xl:top-32 -translate-x-1/2 transform px-4 sm:px-0 bg-cyan-100  top-16 overflow-hidden mb-10">
                      {/* {window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} */}

                      <div className=" h-screen overflow-scroll scrollbar-hide scroll-m-0 bg-scroll rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 pt-6 xl:ml-6 ">
                        <div className="relative grid lg:grid-cols-1">
                          <Image width="900" height="900"
                            src="/pictures/RESTAURANT/Restaurant-1.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/RESTAURANT/Restaurant-2.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/RESTAURANT/Restaurant-3.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/RESTAURANT/Restaurant-4.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/RESTAURANT/Restaurant-5.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/RESTAURANT/Restaurant-6.png"
                            className="w-[60em] object-contain  "
                            alt=""
                          />
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <p className="hidden lg:block text-4xl font-bold text-indigo-500">
              FOOD CORNER
            </p>
          </div>
        </div>
      </div>

      <div className="m-2 xs:mt-20 xxs:mt-32 sm:pt-32 md:pt-28 xl:pt-32">
        <p className=" xs:text-center xxs:text-center  sm:text-center md:text-center md:mt-20 md:mb-10 text-4xl lg:hidden  text-indigo-500 font-bold sm:mb-5 xs:text-3xl">
          FITNESS ZONE
        </p>

        <div className="h-[50vh] md:mt-16 flex xs:flex-col xs:justify-between  md:justify-around  gap-96  items-center  w-full xs:-mt-6 ">
          <div className=" mt-16 w-full lg:flex lg:justify-around lg:items-center xl:flex xl:justify-around xl:items-center ">
            <p className="hidden lg:block text-4xl font-bold text-indigo-500 ">
              FITNESS ZONE
            </p>

            <Popover className="">
              {({ open }) => (
                <>
                  <div className="flex items-center justify-center w-[90vw] xs:w-full xxs:w-full xs:flex-1 xxs:flex-1 sm:flex-1 md:flex-1 lg:w-[47em]   mx-auto ">
                    <Popover.Button
                      className={`
              ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 bg-gray-200 relative xs:h-full xs:w-screen flex-1 w-[90vw] md:h-[25em] md:w-[40em]  md:justify-center md:items-center lg:h-[25em] lg:w-[46em]  xl:h-[25em] xl:w-[41em]`}
                    >
                      <Image width="900" height="900"
                        src="/pictures/Gym/bg.png"
                        alt="background pic"
                        className="xs:h-full xs:w-full  md:w-full md:h-full     lg:h-[55vh] lg:w-[55vw] xl:w-82 xl:h-82  object-contain transform hover:scale-105 duration-500 ease-in-out flex-1   "
                      ></Image>
                      {/* {window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} */}
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-[53vw]  scroll-m-0 z-10 mt-1 w-screen max-w-2xl xs:top-44 xs:max-w-[90vw] xs:left-[10em] xxs:top-44 xxs:mx-auto sm:max-w-lg sm:mx-auto sm:top-80  md:max-w-2xl md:mx-auto md:left-[25em] md:top-44 lg:max-w-4xl lg:mx-auto lg:top-28 lg:left-[32em] xl:max-w-5xl xl:mx-auto xl:-right-[35em] xl:top-32 -translate-x-1/2 transform px-4 sm:px-0 bg-cyan-100  top-16 overflow-hidden mb-10">
                      {/* {window.scrollTo({ top: 0, left: 0, behavior: "smooth" })} */}

                      <div className="  h-screen overflow-scroll scrollbar-hide scroll-m-0 bg-scroll rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 pt-6 mb-2 xl:ml-6">
                        <div className="relative grid  lg:grid-cols-1">
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-1.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-2.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-3.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-4.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-5.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-6.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-7.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                          <Image width="900" height="900"
                            src="/pictures/Gym/gym-8.png"
                            className="w-[60em] object-contain"
                            alt=""
                          />
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>

    </>
  );
};

export default Portfolio;
