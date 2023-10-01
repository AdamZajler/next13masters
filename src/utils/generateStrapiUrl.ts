export const generateStrapiUrl = (path: string) => {
	return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
};
