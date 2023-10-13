import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
	CartGetByEmailDocument,
	type CartGetByEmailQuery,
} from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { parsePrice } from "@/utils/parsePrice";

export default async function OrderPage() {
	const user = await currentUser();
	if (!user) {
		redirect("/sign-in");
	}

	const email = user.emailAddresses[0]?.emailAddress;
	if (!email) {
		return <div>User does not have email</div>;
	}

	let orders: CartGetByEmailQuery | null = await executeGraphQl({
		query: CartGetByEmailDocument,
		variables: { email },
	});

	if (orders.orders?.data.length === 0) {
		orders = null;
	}

	return (
		<>
			<h1>{user.firstName}&rsquo;s Orders</h1>
			{orders ? (
				<ul>
					{orders.orders?.data.map((order, index) => (
						<li key={index}>
							<div>{order.id}</div>
							<div>
								<ul>
									{order.attributes?.cart_item?.data.map((product, index) => (
										<li key={`${index}_${product.id}`}>
											<div className="flex gap-2">
												<div>{product.id}</div>
												<div>
													{product.attributes?.product?.data?.attributes?.title}{" "}
													&nbsp;
													{parsePrice(
														product.attributes?.product?.data?.attributes
															?.price || 0,
													)}
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</li>
					))}
				</ul>
			) : null}
			{/* {orders.length === 0 ? (
	    <div>No orders found</div>
	  ) : (
	    <ul>
		  {orders.map((order) =>
			order.id && order.attributes?.createdAt && (
			  <li key={order.id}>
			    <div>{order.attributes.orderId}</div>
			    <div>
			      <time dateTime={order.attributes.createdAt}>
				    {order.attributes.createdAt}
				  </time>
			    </div>
			  </li>
			)
		  )}
		</ul>
	  )} */}
		</>
	);
}
