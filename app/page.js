import Image from "next/image";
import Banner from "./_components/Banner";
import Technologies from "./_components/Technologies";
import Life from "./_components/Life";
import Skills from "./_components/Skills";
import Contact from "./contact/page";

export default function Home() {
  return (<>
   <Banner />
   <Technologies />
   <Skills />
   <Life />
   <Contact />
  </>
  );
}
