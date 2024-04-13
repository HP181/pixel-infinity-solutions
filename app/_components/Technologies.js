const Technologies = () => {
  return (
    <div className="mt-10">
      <h1 className=" text-center font-bold sm:mt-[4em]  md:mt-32  text-4xl underline underline-offset-[16] mb-10 ">
        our expertise
      </h1>
      <div className=" grid place-items-center sm:grid-cols-2 sm:gap-10 xxs:gap-14 sm:w-full sm:h-full md:grid-cols-2 md:w-full md:h-full  lg:max-w-5xl lg:mx-auto lg:grid-cols-3  lg:mb-32">
        <div className="h-64 w-64  m-2 bg-slate-50 rounded-lg shadow-2xl hover:scale-110 ease-out transition-all duration-500">
          <h1 className="text-center font-bold text-2xl mt-3">Front-end</h1>
          <h2 className=" text-center text-indigo-500 font-semibold">
            Development
          </h2>
          <p className="p-4 text-justify">
            we builds the modern front-end portion of websites and web
            applications. creates the visual front-end elements of a software,
            application or website.
          </p>
        </div>
        <div className="h-64 w-64  m-2 bg-slate-50 rounded-2xl  shadow-xl hover:scale-110 ease-out transition-all duration-500">
          <h1 className="text-center font-bold text-2xl mt-3">Back-end</h1>
          <h2 className=" text-center text-indigo-500 font-semibold">
            Development
          </h2>
          <p className="p-6 text-justify">
            we experts who build and maintain the mechanisms that process data
            and perform actions on websites with data storage, security.
          </p>
        </div>
        <div className="h-64 w-64  m-2 bg-slate-50 rounded-2xl  shadow-xl hover:scale-110 ease-out transition-all duration-500">
          <h1 className="text-center font-bold text-2xl mt-3">E-commerce</h1>
          <h2 className=" text-center text-indigo-500 font-semibold">
            Development
          </h2>
          <p className="p-6 text-justify">
            we responsible for creating the e-commerce businesses experiences
            that consumers have come to expect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Technologies;