/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dropdown-menu",
      "react-icons",
      "flowbite-react",
    ],
  },
};

export default nextConfig;
