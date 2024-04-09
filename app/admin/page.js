import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const page = () => {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <br />
      <LoginLink className="bg-black px-10 py-2 text-white rounded-lg">
        Sign in
      </LoginLink>
    </div>
  );
};

export default page;
