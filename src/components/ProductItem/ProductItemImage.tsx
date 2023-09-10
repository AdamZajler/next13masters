"use client";
import Image from "next/image";
import { useState } from "react";
import { type IProductListItem } from "@/types/IProductListItem";

export const ProductItemImage = ({
	image,
	title,
}: {
	image: IProductListItem["image"];
	title: string;
}) => {
	const [isHovering, setIsHovered] = useState(false);

	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	return (
		<Image
			width={383}
			height={383}
			src={isHovering ? image.hover.url : image.main.url}
			alt={image.main.alt || `Obraz produktu ${title}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{ objectFit: "cover" }}
		/>
	);
};
