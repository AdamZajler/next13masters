"use client";
import { useState } from "react";
import { AddToCartButtonShort } from "../AddToCartButtonShort";
import { ProductItemImage } from "@components/ProductItem/ProductItemImage";
import { parsePrice } from "@/utils/parsePrice";
import { type IProduct } from "@/types/IProduct";

export const ProductItem = ({ title, price, image }: IProduct) => {
	const [isHovering, setIsHovered] = useState(false);

	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	return (
		<div
			className={`border-[1px] border-solid ${
				isHovering ? "border-black" : "border-transparent"
			}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<ProductItemImage image={image} title={title} />
			<div className="flex w-full items-center justify-between pr-4 text-left">
				<div>
					<h3>{title}</h3>
					{/* <ProductItemCategrories categories={categories} /> */}
					<p>{parsePrice(price)}</p>
				</div>
				<div>
					<AddToCartButtonShort />
				</div>
			</div>
		</div>
	);
};
