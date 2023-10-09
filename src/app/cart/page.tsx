import { redirect } from "next/navigation";
import { handlePayAction } from "./actions";
import { getCartByFromCookies } from "@/services/cart";
import { parsePrice } from "@/utils/parsePrice";
import { ProductQty } from "@/components/ProductQty";

export default async function CartPage() {
	const cart = await getCartByFromCookies();

	if (
		!cart?.attributes?.cart_item?.data ||
		!cart.attributes.cart_item.data.length
	) {
		redirect("/");
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Product</th>
					<th className="px-8 text-center">Quantity</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{cart.attributes.cart_item?.data.map((item) => {
					const product = {
						id: item.id,
						qty: item.attributes!.qty,
						...item.attributes!.product!.data!.attributes,
					};

					return (
						<tr key={item.id}>
							<td title={product.slug!}>{product.title}</td>
							<td className="text-center">
								<ProductQty itemId={product.id!} qty={product.qty} />
							</td>
							<td>{parsePrice(product.price!)}</td>
						</tr>
					);
				})}
				<tr>
					<td className="pt-10">
						<form action={handlePayAction}>
							<button type="submit" className="bg-slate-800 px-4 py-2">
								ZAPŁAĆ
							</button>
						</form>
					</td>
				</tr>
			</tbody>
		</table>
	);
}
