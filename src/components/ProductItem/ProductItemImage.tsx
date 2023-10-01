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
		<div className="relative min-h-[400px] w-[320px] overflow-hidden transition-all">
			<Image
				src={image}
				alt={`Obraz produktu ${title}`}
				// alt={image.main.alt || `Obraz produktu ${title}`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				style={{
					objectFit: "cover",
					transform: isHovering ? "scale(1.25)" : undefined,
					transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
				}}
				fill
			/>
		</div>
	);
};
