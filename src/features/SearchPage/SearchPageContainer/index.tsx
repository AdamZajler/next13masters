"use client";

import { useSearchParams } from "next/navigation";
import { type ReactNode } from "react";

export const SearchPageContainer = ({ children }: { children: ReactNode }) => {
	const searchParams = useSearchParams().get("query");

	return (
		<div className="w-full">
			<h1>Wyszukiwarka {searchParams || ""}</h1>
			{children}
		</div>
	);
};
