import { skillsData } from "@/lib/data";
import Image from "next/image";

const Skills = () => {
  return (
    <>
      <div className="h-full  rounded-lg mt-10 sm:mt-16 pb-2">
        <p className="text-center pt-10 text-4xl  font-bold">Our Skills</p>
        <div className="grid  xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  m-10 h-full justify-evenly  place-items-center gap-y-12">
          {skillsData.map((item, index) => (
            <div
              className="h-44 w-44  flex flex-col items-center justify-center"
              key={index}
            >
              <div className="h-28 w-28 border-2 shadow-xl  ">
                <Image
                  width="900"
                  height="900"
                  src={item?.url}
                  className="h-full w-full object-contain p-2"
                  alt=""
                />
              </div>
              <p className="pt-6 font-semibold text-xl">{item?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
