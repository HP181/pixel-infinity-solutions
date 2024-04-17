import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className=" pb-3 mt-3 bg-[#f3f4f6] dark:bg-[#1d2432]">
        <div className="w-[80vw] mx-auto ">
          <div className="grid xs:grid-col-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 p-6">
            <div className="  flex   flex-col md:w-72 xs:justify-evenly xs:items-center xxs:justify-evenly xxs:items-center sm:justify-evenly sm:items-center  md:justify-evenly md:items-center text-center h-60  xs:w-52 xxs:w-72   sm:w-80  lg:w-60 xl:w-72 ">
              <div>
                <Image
                  src="/footer-logo.png"
                  height="900"
                  width="900"
                  className=" w-60 h-60 object-contain flex-1"
                  alt="Footer Logo"
                />
              </div>
            </div>

            <div className=" flex   flex-col md:w-72 xs:justify-evenly xs:items-center xxs:justify-evenly xxs:items-center sm:justify-evenly sm:items-center  md:justify-evenly md:items-center text-center h-60  xs:w-52 xxs:w-72   sm:w-80  lg:w-60 xl:w-72 ">
              <div>
                <h1 className="font-semibold">COMPANY</h1>
              </div>
              <div>
                <p className="text-lg">About</p>
                <p className="text-lg">Sitemap</p>
                <p className="text-lg">Portfolio</p>
                <p className="text-lg">Technologies</p>
              </div>
            </div>

            <div className="  flex   flex-col md:w-72 xs:justify-evenly xs:items-center xxs:justify-evenly xxs:items-center sm:justify-evenly sm:items-center  md:justify-evenly md:items-center text-center h-60    xs:w-52 xxs:w-72 sm:w-80  lg:w-60 xl:w-72 ">
              <div>
                <h1 className="font-semibold">SERVICES</h1>
              </div>
              <div className="">
                <p className="text-lg">Testing QA</p>
                <p className="text-lg">Web Design</p>
                <p className="text-lg">Web Development</p>
                <p className="text-lg">E-Commerce Development</p>
              </div>
            </div>
          </div>
          <h1 className=" text-center mx-auto text-xs xs:w-60 xxs:w-[22em] sm:w-[45em] ">
            {" "}
            THIS IS NOT A REGISTERED COMPANY WEBSITE, ITS JUST FOR DEMO PURPOSE
            ONLY.
          </h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
