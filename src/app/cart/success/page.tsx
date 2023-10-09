import { redirect } from "next/navigation";
import Stripe from "stripe";

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

	return <div>{session.payment_status}</div>;
}
