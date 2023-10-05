"use client";

import { type Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const Search = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	router.prefetch("/search" as Route);

	const handleSearch = useDebouncedCallback((value: string) => {
		if (pathname !== "/search") {
			router.push("/search" as Route);
		}

		const searchParam = searchParams.get("query");

		if (searchParam !== value && value !== "") {
			router.push(`/search?query=${value}` as Route);
		} else if (value === "" || searchParam === null || searchParam === "") {
			router.push("/search" as Route);
		}
	}, 500);

	return <input type="search" onChange={(e) => handleSearch(e.target.value)} />;
};
