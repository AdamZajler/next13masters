import { ProductList } from "@/components/ProductList";
import { type IProductListItem } from "@/types/IProductListItem";

const productFakeData: IProductListItem = {
	title: "Samba OG",
	price: 549,
	categories: [
		{ title: "Męskie", url: "#" },
		{ title: "Originals", url: "#" },
	],
	image: {
		main: {
			url: "/shoe1_front.avif",
			alt: "Obraz produktu dla Samba OG",
		},
		hover: {
			url: "/shoe1_back.avif",
			alt: "Obraz z góry produktu dla Samba OG",
		},
	},
};

export default function Home() {
	return (
		<main className="container-xl flex min-h-screen flex-col items-center justify-between p-24">
			<ProductList
				products={[productFakeData, productFakeData, productFakeData, productFakeData]}
			/>
		</main>
	);
}
