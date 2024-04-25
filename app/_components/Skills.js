import { skillsData } from "@/lib/data";
import Image from "next/image";

const Skills = () => {
  return (
    <>
      <div className="h-full rounded-lg mt-10 sm:mt-16 pb-2">
        <p className="text-center pt-10 text-4xl  font-bold">Our Skills</p>
        <div className="grid  grid-cols-2 gap-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  m-10 h-full justify-evenly  place-items-center gap-y-12">
          {skillsData.map((item, index) => (
            <div
              className="h-36 w-36 sm:h-44 sm:w-44 p-2 flex flex-col items-center justify-center"
              key={index}
            >
              <div className="h-20 w-20 sm:h-28 sm:w-28 border-2 shadow-xl  ">
                <Image
                  width="900"
                  height="900"
                  src={item?.url}
                  className="h-full w-full object-contain p-2 dark:invert"
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
