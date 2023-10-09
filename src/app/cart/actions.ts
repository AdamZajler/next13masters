"use server";

import { revalidateTag } from "next/cache";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCartByFromCookies } from "@/services/cart";
import {
	CartDeleteProductDocument,
	CartSetProductQtyDocument,
} from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export async function handlePayAction() {
	"use server";
	const cart = await getCartByFromCookies();

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("STRIPE_SECRET_KEY is not defined");
	}
	if (!cart || !cart?.attributes?.cart_item?.data) {
		return;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const checkoutSession = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "blik"],
		metadata: {
			cartId: cart.id!,
		},
		line_items: cart.attributes.cart_item.data.map((item) => ({
			price_data: {
				currency: "pln",
				product_data: {
					name: item.attributes!.product!.data!.attributes!.title,
				},
				unit_amount: Number(
					(item.attributes!.product!.data!.attributes!.price * 100).toFixed(),
				),
			},
			quantity: item.attributes?.qty,
		})),
		mode: "payment",
		success_url:
			"http://localhost:3000/cart/success?sessionId={CHECKOUT_SESSION_ID}",
		cancel_url: "http://localhost:3000/cart/cancel",
	});

	if (!checkoutSession.url) {
		throw new Error("checkoutSession.url is not defined");
	}

	cookies().set("cartId", "");
	redirect(checkoutSession.url);
}

export const changeItemQty = async (itemId: string, qty: number) => {
	if (qty === 0) {
		await executeGraphQl({
			query: CartDeleteProductDocument,
			variables: { itemId },
		});
		revalidateTag("cart");
	}

	await executeGraphQl({
		query: CartSetProductQtyDocument,
		variables: { itemId, qty },
	});
};
