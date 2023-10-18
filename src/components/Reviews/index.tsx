import { ReviewsForm } from "./ReviewsForm";
import {
	ProductGetLiveReviewsDocument,
	ProductGetPreviewReviewsDocument,
} from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export const Reviews = async ({ productId }: { productId: string }) => {
	const reviewsLive = await executeGraphQl({
		query: ProductGetLiveReviewsDocument,
		variables: { productId: productId },
	});

	const reviewsPreview = await executeGraphQl({
		query: ProductGetPreviewReviewsDocument,
		variables: { productId: productId },
	});

	return (
		<ReviewsForm
			reviewsLive={reviewsLive}
			reviewPreview={reviewsPreview}
			productId={productId}
		/>
	);
};
