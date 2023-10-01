/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
	},
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	redirects: async () => [
		{
			source: "/products",
			destination: "/products/1",
			permanent: false,
		},
		{
			source: "/categories/:slug",
			destination: "/categories/:slug/1",
			permanent: false,
		},
	],
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
