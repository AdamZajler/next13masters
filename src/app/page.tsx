import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
	ProductsGetCollectionsDocument,
	ProductsGetListDocument,
} from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { ProductList } from "@/components/ProductList";

export default async function Home() {
	const collections = await executeGraphQl({
		query: ProductsGetCollectionsDocument,
	});

	if (!collections.collections?.data) {
		notFound();
	}

	const products = await executeGraphQl({
		query: ProductsGetListDocument,
		variables: {
			page: 1,
			sort: null,
		},
	});

	if (!products.products) {
		return notFound();
	}

	return (
		<>
			<div className="flex w-full flex-col items-center gap-8 border-teal-50">
				<div className="flex w-full gap-4">
					{collections.collections.data.map((collection, index) => (
						<Link
							key={index}
							href={`/collections/${collection.attributes?.slug}`}
							className="flex min-h-[280px] basis-1/3 flex-col text-center"
						>
							{collection.attributes?.image.data?.attributes?.url ? (
								<div className="relative grow">
									<Image
										src={collection.attributes?.image.data?.attributes?.url}
										alt={`Obraz dla ${collection.attributes?.title}`}
										fill
										style={{ objectFit: "contain" }}
									/>
								</div>
							) : null}

							<h3>{collection.attributes?.title}</h3>
						</Link>
					))}
				</div>

				<h1 className="text-2xl">Strona główna</h1>
				<ProductList products={products.products.data} />
			</div>
		</>
	);
}
