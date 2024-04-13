import React from 'react'

const page = () => {
  return (
    <section className="text-gray-600 body-font">
        <div className="  px-5 py-14 mx-auto">
          <div className=" flex flex-col text-center  w-full mb-20">
            <h1 className="sm:text-3xl sm:text-center text-2xl font-bold title-font mb-4 text-gray-900">
              About
            </h1>
            <h2 className=" mt-6 sm:mb-6 text-center text-lg text-indigo-500 tracking-widest font-medium title-font mb-1">
              Skill, Technology, Innovation
            </h2>
            <p className=" mt-4 text-justify sm:text-center sm:pt-4 lg:w-2/3 mx-auto leading-relaxed text-base">
              Codebucks is a well established IT company in poland.we offer
              website development services. we have work all over the world.
              Every website we using the latest method and technology.
            </p>
          </div>
          <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6  border-gray-200 border-opacity-60">
              <h2 className=" text-center text-lg sm:text-xl text-gray-900 font-bold title-font mb-4">
                Website Development
              </h2>
              <p className="leading-relaxed text-base mb-4 text-center">
                we create and maintain Web application for your business.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6  border-gray-200 border-opacity-60 lg:border-l-2">
              <h2 className=" text-center text-lg sm:text-xl text-gray-900 font-bold title-font mb-4">
                Software Development
              </h2>
              <p className="leading-relaxed text-justify text-base mb-4 sm:text-center">
                CodeBucks offers to create, design, deploy and
                supports softwares that meet your needs.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6  border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-center text-gray-900 font-bold title-font mb-2">
                E-Commerce Development
              </h2>
              <p className="leading-relaxed text-base mb-4 text-justify sm:text-center">
                We create and implement E-commerce solutions that are integrated
                with your online business . we will deliver
                your project on time and maintain quality.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-gray-200 border-opacity-60 lg:border-l-2">
              <h2 className="text-lg sm:text-xl text-gray-900 font-bold title-font mb-2 text-center">
                Website Disging
              </h2>
              <p className="leading-relaxed text-base mb-4 text-justify sm:text-center">
                CodeBucks provide unique desging with fully responsive websites.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default page