import type { NextConfig } from "next";
const config: NextConfig = {
  async redirects() {
    return [
      {
        source: "/screening-room",
        destination: "/a-little-magic",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};
export default config;
