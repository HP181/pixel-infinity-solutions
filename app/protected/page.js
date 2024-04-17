import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LoggedInNavbar from "@/app/_components/LoggedInNavbar";
import LoggedOutNavbar from "../_components/LoggedoutNavbar";

export default async function Protected() {
  const { isAuthenticated } = getKindeServerSession();

  return (await isAuthenticated()) ? <LoggedInNavbar /> : <LoggedOutNavbar />;
}
