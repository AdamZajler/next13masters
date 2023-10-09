"use client";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export const AddToCartButton = () => {
	const formStatus = useFormStatus();

	return (
		<button
			type="submit"
			disabled={formStatus.pending}
			className="rounded-lg bg-gray-500 p-2 disabled:cursor-wait disabled:bg-slate-300"
			data-testid="add-to-cart-button"
		>
			Add to cart
		</button>
	);
};
