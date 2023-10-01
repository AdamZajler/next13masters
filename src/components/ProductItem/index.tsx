"use client";
import Link from "next/link";
import { type Route } from "next";
import { AddToCartButtonShort } from "../AddToCartButtonShort";
import { ProductItemImage } from "@components/ProductItem/ProductItemImage";
import { parsePrice } from "@/utils/parsePrice";
import { type IProduct } from "@/types/IProduct";

export const ProductItem = ({ title, price, image, id }: IProduct) => {
	const url = `/product/${id}` as Route;

	return (
		<div>
			<Link href={url}>
				<ProductItemImage image={image} title={title} />
			</Link>
			<div className="flex w-full items-center justify-between text-left">
				<Link href={url}>
					<div>
						<h3>{title}</h3>
						<p>{parsePrice(price)}</p>
					</div>
				</Link>
				<div>
					<AddToCartButtonShort />
				</div>
			</div>
		</div>
	);
};
