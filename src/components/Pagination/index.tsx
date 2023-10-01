import { type Route } from "next";
import { ActiveLink } from "../ActiveLink";

export function Pagination({ href, length }: { href: string; length: number }) {
	return (
		<ul className="flex gap-2" aria-label="pagination">
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
			{[...Array(length)].map((_, index) => {
				const pageNumber = index + 1;
				return (
					<li key={index}>
						<ActiveLink
							activeClassName="underline"
							href={`${href}${pageNumber}` as Route}
						>
							{pageNumber}
						</ActiveLink>
					</li>
				);
			})}
		</ul>
	);
}
