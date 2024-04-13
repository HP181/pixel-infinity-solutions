"use client"
import Image from "next/image";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: ["Your Dreams Are Our Priority, We Make You feel Comfortable."],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <>
      {/* <div className="xs:grid-rows-1  xxs:grid-rows-1 sm:grid-rows-1  grid-rows-2 md:grid md:grid-cols-2  mt-4">
        <div className="xs:row-span-full xxs:row-span-full xxs:w-full sm:row-span-full sm:w-full md:col-span-1 xs:w-full    md:h-[80vh] p-8 flex items-center ">
          <div className="relative xs:mb-40 mb-64 md:mb-72 xs:w-full xxs:w-full sm:w-full xs:text-center sm:text-center">
            <h1 className=" xs:text-lg xxs:text-lg text-center sm:p-4 sm:text-5xl  font-mono font-semibold  text-4xl absolute sm:w-full  ">
              {text}
              <span>
                <Cursor cursorColor="black" />
              </span>
            </h1>
          </div>
          <span></span>
        </div>
        <div className=" xs:h-full xs:w-[80vw] xs:m-auto sm:row-span-1 sm:m-auto md:col-span-1  md:h-[80vh] md:m-auto  xxs:-mt-20 ">
          <Image width="900" height="900"
            src="/bg.png"
            className="xs:h-52 xs:w-96 xs:m-auto sm:h-[35em] sm:w-[35em] sm:m-auto md:w-full md:h-full object-contain p-2"
            alt=""
          />
        </div>
      </div> */}




      <section className="w-full py-5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="text-3xl text-center tracking-tighter sm:text-5xl xl:text-5xl/none bg-red-400 h-28 sm:h-40 md:h-28 lg:h-40">
                {text}
              <span>
                <Cursor cursorColor="black" />
              </span>
                </h1>
                {/* <p className="max-w-[600px] text-center text-gray-500 md:text-xl dark:text-white/65 mt-5">
                  I&apos;m a full-stack web developer with 2 years of
                  experience. I enjoy building Web Apps with React & NextJs.
                </p> */}
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 md:mt-5 lg:order-last lg:gap-10">
              <Image
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg shadow-blue-400"
                height="310"
                src="/bg.png"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
