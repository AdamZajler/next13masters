"use client";
import { experimental_useOptimistic as useOptimistic } from "react";
import { changeItemQty } from "@/app/cart/actions";
export const ProductQty = ({
	qty,
	itemId,
}: {
	qty: number;
	itemId: string;
}) => {
	const [optimisticQty, setOptimisticQty] = useOptimistic(qty);

	const handleChange = async (decrement = false) => {
		setOptimisticQty(optimisticQty + (decrement ? -1 : 1));
		await changeItemQty(itemId, optimisticQty + (decrement ? -1 : 1));
	};

	return (
		<form>
			<button
				className="mx-1 h-8 w-8 border bg-slate-50"
				formAction={async () => handleChange(true)}
				data-testid="decrement"
			>
				-
			</button>
			<span data-testid="quantity">{optimisticQty}</span>
			<button
				className="mx-1 h-8 w-8 border bg-slate-50"
				formAction={async () => handleChange()}
				data-testid="increment"
			>
				+
			</button>
		</form>
	);
};
