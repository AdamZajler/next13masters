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

		// <div className="flex gap-10">
		// 	<div className="flex flex-col gap-4">
		// 		<h5>Recenzja</h5>
		// 	</div>
		// 	<div className="flex grow flex-col gap-4">
		// 		{reviewsLive.reviews?.data.length === 0 &&
		// 		reviewsPreview.reviews?.data.length === 0 ? (
		// 			<h2>Brak opini o produkcie</h2>
		// 		) : (
		// 			<>
		// 				{[...(reviewsPreview.reviews?.data || [])].map((review, index) => (
		// 					<div key={index} className="opacity-40">
		// 						<h2 className="text-xl">
		// 							{review.attributes?.name} {review.attributes?.rating}/5
		// 						</h2>
		// 						<span className="text-sm text-slate-700">
		// 							{review.attributes?.title}
		// 						</span>
		// 						<p className="text-sm">{review.attributes?.content}</p>
		// 					</div>
		// 				))}
		// 				{[...(reviewsLive.reviews?.data || [])].map((review, index) => (
		// 					<div key={index}>
		// 						<h2 className="text-xl">
		// 							{review.attributes?.name} {review.attributes?.rating}/5
		// 						</h2>
		// 						<span className="text-sm text-slate-700">
		// 							{review.attributes?.title}
		// 						</span>
		// 						<p className="text-sm">{review.attributes?.content}</p>
		// 					</div>
		// 				))}
		// 			</>
		// 		)}
		// 	</div>
		// </div>
	);
};
