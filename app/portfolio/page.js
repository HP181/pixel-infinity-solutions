"use client";

import {useState } from "react";
import Image from "next/image";
import data from "@/lib/data"
import { Modal } from "flowbite-react";

const Portfolio = () => {
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);

 
  const handleClick = (id) => {
    setId(id);
    setOpenModal(true);
  };

  return (
    <div className="flex-1 mt-5 md:mt-10 max-w-6xl m-auto ">
      <section className="w-full py-5">
        <div className="px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="text-3xl text-center font-semibold tracking-tighter sm:text-4xl xl:text-4xl/none">
                  Ecommerce
                </h1>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:order-last lg:gap-10 border-black">
              <Image
                className="mx-auto aspect-video overflow-hidden rounded-xl cursor-pointer object-cover object-center shadow-lg shadow-blue-400 hover:scale-105 transition-all duration-150 ease-in-out"
                src={data[0].url[0]}
                height="900"
                width="900"
                alt="Image"
                onClick={() => handleClick(0)}
              />
            </div>
          </div>
        </div>
      </section>


      <section className="w-full mt-12">
        <div className="px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="text-3xl text-center font-semibold tracking-tighter sm:text-4xl xl:text-4xl/none">
                  Gym
                </h1>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:order-first lg:gap-10 border-black">
              <Image
                className="mx-auto aspect-video overflow-hidden rounded-xl cursor-pointer object-fill object-center shadow-lg shadow-blue-400 hover:scale-105 transition-all duration-150 ease-in-out"
                src={data[1].url[0]}
                height="900"
                width="900"
                alt="Image"
                onClick={() => handleClick(1)}
              />
            </div>
          </div>
        </div>
      </section>


      <section className="w-full mt-20 mb-5">
        <div className="px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="text-3xl text-center font-semibold tracking-tighter sm:text-4xl xl:text-4xl/none">
                  Restaurant
                </h1>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:order-last lg:gap-10 border-black">
              <Image
                className="mx-auto aspect-video overflow-hidden rounded-xl cursor-pointer object-cover object-center shadow-lg shadow-blue-400 hover:scale-105 transition-all duration-150 ease-in-out"
                src={data[2].url[0]}
                height="900"
                width="900"
                alt="Image"
                onClick={() => handleClick(2)}
              />
            </div>
          </div>
        </div>
      </section>

      <Modal show={openModal} onClose={() => setOpenModal(false)} size="5xl">
        <Modal.Header className="dark:bg-[#303c54] dark:rounded-lg">Demo</Modal.Header>
        <Modal.Body className="scrollbar-hide flex justify-center gap-0 m-0 p-2 dark:bg-[#303c54] dark:rounded-lg">
          <div className="space-y-6">
           {data[id]?.url.map((item, index) => (
            <Image src={item} width="900" height="900" key={index} className="m-0 !mt-0" alt="Images"></Image>
           ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Portfolio;
