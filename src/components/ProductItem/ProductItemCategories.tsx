import React from "react";
import { CategoryChip } from "../CategoryChip";
import { type IProductListItem } from "@/types/IProductListItem";

export const ProductItemCategrories = ({
	categories,
}: {
	categories: IProductListItem["categories"];
}) => {
	return (
		<div className="text-sm">
			{categories.map((category, index) => (
				<React.Fragment key={index}>
					<CategoryChip category={category} />
					{index === categories.length - 1 ? "" : " | "}
				</React.Fragment>
			))}
		</div>
	);
};
