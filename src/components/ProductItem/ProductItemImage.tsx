"use client";
import Image from "next/image";
import { useState } from "react";
import { type IProduct } from "@/types/IProduct";

export const ProductItemImage = ({
	image,
	title,
}: {
	image: IProduct["image"];
	title: string;
}) => {
	const [isHovering, setIsHovered] = useState(false);

	const onMouseEnter = () => setIsHovered(true);
	const onMouseLeave = () => setIsHovered(false);

	return (
		<Image
			width={320}
			height={320}
			src={isHovering ? image : image}
			alt={`Obraz produktu ${title}`}
			// alt={image.main.alt || `Obraz produktu ${title}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			style={{ objectFit: "contain", maxHeight: 320 }}
		/>
	);
};
