import { notFound } from "next/navigation";
import { Pagination } from "@/components/Pagination";
import { ProductList } from "@/components/ProductList";
import { type IProduct } from "@/types/IProduct";
import "@/components/main.css";

export async function generateStaticParams() {
	return [
		{ pageNumber: ["1"] },
		{ pageNumber: ["2"] },
		{ pageNumber: ["3"] },
		{ pageNumber: ["4"] },
		{ pageNumber: ["5"] },
	];
}

export default async function Home({
	params,
}: {
	params: { pageNumber: string[] };
}) {
	if (Object.keys(params).length > 0) {
		if (!Number(params.pageNumber[0])) {
			return notFound();
		}
	}

	const pageNumber: number = Object.keys(params).length
		? Number(params.pageNumber[0]) || 0
		: 0;

	const products = (await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=20${
			pageNumber === 0 ? "" : `&offset=${pageNumber}`
		}`,
	).then((res) => res.json())) as IProduct[];

	return (
		<main className="container-xl flex min-h-screen w-full flex-col items-center justify-between p-24">
			<ProductList products={products} />
			<div className="mt-12">
				<Pagination href="/products/" length={5} />
			</div>
		</main>
	);
}
