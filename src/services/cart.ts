import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import {
	CartAddProductDocument,
	CartCreateDocument,
	type CartFragment,
	GetCartByIdDocument,
	CartDeleteProductDocument,
} from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export async function getOrCreateCart(): Promise<CartFragment> {
	const existingCart = await getCartByFromCookies();
	if (existingCart) {
		return existingCart;
	}

	const cart = await createCart();
	if (!cart.createOrder?.data) {
		throw new Error("Failed to create cart");
	}
	cookies().set("cartId", cart.createOrder.data.id!);

	return cart.createOrder.data as CartFragment;
}

export async function getCartByFromCookies(): Promise<
	CartFragment | undefined
> {
	const cartId = cookies().get("cartId")?.value;

	if (cartId) {
		const cart = await executeGraphQl({
			query: GetCartByIdDocument,
			variables: { id: cartId },
			next: {
				tags: ["cart"],
			},
		});

		if (cart.orders?.data.length && cart.orders.data[0] !== undefined) {
			return cart.orders.data[0] as CartFragment;
		}
	}
}

export async function createCart() {
	return executeGraphQl({ query: CartCreateDocument });
}

export async function addToCart(orderId: string, productId: string) {
	const cart = await getCartByFromCookies();
	let qty = 1;
	const productInCart = cart?.attributes?.cart_item?.data.find(
		(item) => item.attributes?.product?.data?.id === productId,
	);

	if (productInCart) {
		qty = (productInCart.attributes?.qty as number) + 1;

		await executeGraphQl({
			query: CartDeleteProductDocument,
			variables: { itemId: productInCart.id! },
		});
		revalidateTag("cart");

		return;
	}

	await executeGraphQl({
		query: CartAddProductDocument,
		variables: { orderId, productId, qty },
	});
}