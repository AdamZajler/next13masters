import { type IProduct } from "@/types/IProduct";

export const getProductById = async (id: number): Promise<IProduct> => {
	return fetch(`https://naszsklep-api.vercel.app/api/products/${id}`).then(
		(res) => res.json() as Promise<IProduct>,
	);
};
