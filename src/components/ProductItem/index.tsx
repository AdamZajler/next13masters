"use client";
import Link from "next/link";
import { type Route } from "next";
import Image from "next/image";
import { parsePrice } from "@/utils/parsePrice";
import { type ProductListItemFragment } from "@/gql/graphql";

export const ProductItem = (product: ProductListItemFragment) => {
	const url = `/product/${product.attributes!.slug}` as Route;

	return (
		<Link href={url}>
			{product.attributes?.images.data[0]?.attributes?.url ? (
				<div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
					<Image
						width={320}
						height={320}
						alt={`Obraz produktu ${product.attributes.title}`}
						src={product.attributes.images.data[0].attributes?.url}
						className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
					/>
				</div>
			) : null}
			<div className="flex w-full items-center justify-between text-left">
				<div>
					<h3>{product.attributes!.title}</h3>
					<p data-testid="product-price">
						{parsePrice(product.attributes!.price)}
					</p>
				</div>
				<div>
					Opinie:{" "}
					<span data-testid="product-rating">
						{product.attributes?.reviews_avg || 0}/5
					</span>
				</div>
			</div>
		</Link>
	);
};
