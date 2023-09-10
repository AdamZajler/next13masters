import Link from "next/link";
import { type IProductListItem } from "@/types/IProductListItem";

export const CategoryChip = ({ category }: { category: IProductListItem["categories"][0] }) => {
	return (
		<Link className="text-sm text-neutral-400" href={category.url}>
			{category.title}
		</Link>
	);
};
