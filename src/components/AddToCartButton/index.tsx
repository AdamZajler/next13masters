export const AddToCartButton = ({ className }: { className?: HTMLDivElement["className"] }) => {
	return (
		<div className="group">
			<div
				className={` transition-a flex min-w-[240px] cursor-pointer items-center justify-between bg-black px-4 py-2 text-lg uppercase text-white group-hover:text-neutral-400 ${
					className || ""
				}`}
			>
				Dodaj do koszyka
				<svg
					className=" fill-white group-hover:fill-neutral-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="#000000"
					width="24px"
					height="24px"
					viewBox="0 0 32 32"
				>
					<path d="M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z" />
				</svg>
			</div>
		</div>
	);
};
