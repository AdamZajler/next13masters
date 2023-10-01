/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "naszsklep-api.vercel.app",
			},
		],
	},
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
