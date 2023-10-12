/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "next13masters-ten-backend.onrender.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
	experimental: {
		mdxRs: true,
		serverActions: true,
	},
	redirects: async () => [
		{
			source: "/categories/:slug",
			destination: "/categories/:slug/1",
			permanent: false,
		},
	],
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
