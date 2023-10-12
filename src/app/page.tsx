import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductsGetCollectionsDocument } from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export default async function Home() {
	const collections = await executeGraphQl({
		query: ProductsGetCollectionsDocument,
	});

	if (!collections.collections?.data) {
		notFound();
	}

	return (
		<>
			<div className="flex flex-col items-center gap-8 border-teal-50">
				{collections.collections.data.map((collection, index) => (
					<Link
						key={index}
						href={`/collections/${collection.attributes?.slug}`}
					>
						{collection.attributes?.title}
					</Link>
				))}

				<h1 className="text-2xl">Strona główna</h1>
			</div>
		</>
	);
}
