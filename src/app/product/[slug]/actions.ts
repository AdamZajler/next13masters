"use server";

import {
	ProductAddReviewDocument,
	ProductGetLiveReviewsDocument,
	ProductGetPreviewReviewsDocument,
	ProductSetReviewsAvgDocument,
} from "@/gql/graphql";
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

	// Update reviews_avg on product

	const resLive = await executeGraphQl({
		query: ProductGetLiveReviewsDocument,
		variables: { productId },
	});
	const reviewsLive = resLive.reviews!.data.map((review) =>
		review.attributes ? review.attributes.rating : [],
	) as number[];
	console.log("reviewsLive", reviewsLive);

	const resPreview = await executeGraphQl({
		query: ProductGetPreviewReviewsDocument,
		variables: { productId },
	});

	const reviewsPreviewParsed = resPreview.reviews?.data
		.map((rp) =>
			resLive.reviews?.data.some((rl) => rl.id === rp.id) ? [] : rp,
		)
		.flat();

	const reviewsPreview = reviewsPreviewParsed?.map(
		(review) => review.attributes?.rating || [],
	) as number[];
	console.log("reviewsPreview", reviewsPreview);

	const reviews = [...reviewsLive, ...reviewsPreview];
	console.log("reviews", reviews);
	const avg = Number(
		(reviews.reduce((a, b) => a + b, 0) / reviews.length).toFixed(2),
	);
	console.log("avg", avg);
	await executeGraphQl({
		query: ProductSetReviewsAvgDocument,
		variables: {
			productId,
			reviewsAvg: avg,
		},
	});
	return res.createReview?.data;
}
