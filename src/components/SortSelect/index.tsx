"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Route } from "next";

type OrderByType = {
	label: string;
	value: string;
};

const ORDER_LIST: OrderByType[] = [
	{ label: "PriceAsc.", value: "price:asc" },
	{ label: "PriceDesc.", value: "price:desc" },
	{ label: "RatingAsc.", value: "reviews_avg:asc" },
	{ label: "RatingDesc.", value: "reviews_avg:desc" },
];
export const SortSelect = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<>
			<select
				name="sort-by"
				id="sort-by-id"
				value={searchParams.get("sort") || "Sort by"}
				onChange={(event) =>
					router.push(`${pathname}/?sort=${event.target.value}` as Route)
				}
			>
				<option disabled>Sort by</option>
				{ORDER_LIST.map(({ label, value }) => (
					<option
						key={value}
						value={value}
						data-testid={
							value.includes("price") ? "sort-by-price" : "sort-by-rating"
						}
					>
						{label}
					</option>
				))}
			</select>
		</>
	);
};
