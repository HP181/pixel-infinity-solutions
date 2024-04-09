import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Nav from "../_components/Navbar";
import Navbar from "../_components/Navbar";
import LoggedOutNavbar from "../_components/LoggedoutNavbar";

export default async function Protected() {
    const { isAuthenticated } = getKindeServerSession();
  
    return (await isAuthenticated()) ? (
      <Navbar />
    ) : (
      <LoggedOutNavbar />
    );
  }