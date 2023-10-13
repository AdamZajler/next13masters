import { redirect } from "next/navigation";
import Stripe from "stripe";
import { executeGraphQl } from "@/lib/executeGraphQl";
import { CartSetOrderCompletedDocument } from "@/gql/graphql";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { sessionId?: string };
}) {
	if (!searchParams.sessionId) {
		redirect("/");
	}
	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("STRIPE_SECRET_KEY is not defined");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-08-16",
		typescript: true,
	});

	const session = await stripe.checkout.sessions.retrieve(
		searchParams.sessionId,
	);

	if (!session.metadata?.cartId) {
		redirect("/");
	}

	await executeGraphQl({
		query: CartSetOrderCompletedDocument,
		variables: {
			orderId: session.metadata.cartId,
			date: new Date().toISOString(),
		},
	});

	return (
		<div>
			{/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
			{session.payment_status} {session.metadata.cartId}
		</div>
	);
}
