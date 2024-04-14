"use client";
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
      <section className="w-full py-5">
        <div className=" px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="text-3xl text-center font-sans tracking-tighter sm:text-4xl/none xl:text-4xl/none h-32 sm:h-24 md:h-24 lg:h-28">
                  {text}
                  <span>
                    <Cursor cursorColor="black" />
                  </span>
                </h1>
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
