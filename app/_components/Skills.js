import Image from "next/image";

const Skills = () => {
  return (
    <>
      <div className="h-full bg-slate-50  mt-10 sm:mt-16 ">
        <p className="text-center pt-10 text-4xl  font-bold">Our Skills</p>
        <div className="grid  xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  m-10 h-full justify-evenly  place-items-center gap-y-12">
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl  ">
              <Image width="900" height="900"
                src="/react.png"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">REACT.JS</p>
          </div>

          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/nextjs.png"
                className="h-full w-full object-contain p-4 "
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">NEXT.JS</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/nodejs.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">NODE.JS</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/express.png"
                className="h-full w-full object-contain p-4 "
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">EXPRESS</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/firebase.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">FIREBASE</p>
          </div>

          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/mongodb.png"
                className="h-full w-full object-contain p-2"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">MONGODB</p>
          </div>

          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/mui.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">MATERIAL UI</p>
          </div>

          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/bootstrap.png"
                className="h-full w-full object-conatin p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">BOOTSTRAP</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/tailwind.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">TAILWIND</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/jest.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">JEST</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/angular.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">ANGULAR</p>
          </div>

          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/php.png"
                className="h-full w-full object-contain p-2"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">PHP</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/java.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">JAVA</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/python.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">PYTHON</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/flask.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">FLASK</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/mysql.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">MYSQL</p>
          </div>
          {/* <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900" src="/logo/azure-asl-logo-.png" className="h-full w-full object-cover" alt="" />
            </div>
            <p className="pt-6 font-semibold text-xl">SQL</p>
          </div> */}
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/wordpress.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">WORD PRESS</p>
          </div>

          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/html.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">HTML5</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/css.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">CSS3</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/javascript.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">JAVASCRIPT</p>
          </div>
          <div className="h-44 w-44  flex flex-col items-center justify-center">
            <div className="h-28 w-28 border-2 shadow-xl ">
              <Image width="900" height="900"
                src="/logo/git.png"
                className="h-full w-full object-contain p-4"
                alt=""
              />
            </div>
            <p className="pt-6 font-semibold text-xl">GIT</p>
          </div>

          {/* html css git js */}
        </div>
      </div>
    </>
  );
};

export default Skills;
