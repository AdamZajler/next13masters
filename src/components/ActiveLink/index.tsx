"use client";
import clsx from "clsx";
import { type Route } from "next";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface ActiveLink extends LinkProps<RouteType> {
	href: Route;
	activeClassName: string;
	exact?: boolean;
}

export function ActiveLink({
	activeClassName,
	className,
	exact = true,
	...props
}: ActiveLink) {
	const pathName = usePathname();
	const isActive =
		pathName === props.href || (exact && pathName.startsWith(props.href));

	return (
		<Link
			{...props}
			className={clsx(
				`font-bold text-blue-400`,
				isActive && `${activeClassName || ""}`,
				className && `${className}`,
			)}
			aria-current={isActive || undefined}
		></Link>
	);
}
