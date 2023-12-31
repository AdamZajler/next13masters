"use client";
import clsx from "clsx";
import { type Route } from "next";
import { type RouteType } from "next/dist/lib/load-custom-routes";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface ActiveLink extends LinkProps<RouteType> {
	href: Route;
	activeClassName: string;
	className?: string;
	title?: string;
	children: ReactNode;
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
				isActive && `${activeClassName + " border-b-1 border-blue-400" || ""}`,
				className && `${className}`,
			)}
			aria-current={isActive || undefined}
		/>
	);
}
