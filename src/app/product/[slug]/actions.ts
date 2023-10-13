"use server";

import { ProductAddReviewDocument } from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export async function sendReviewForm(formData: FormData, productId: string) {
	"use server";

	const res = await executeGraphQl({
		query: ProductAddReviewDocument,
		variables: {
			title: formData.get("headline") as string,
			content: formData.get("content") as string,
			rating: Number(formData.get("rating")),
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			productId: `${productId}`,
		},
	});

	return res.createReview?.data;
}
