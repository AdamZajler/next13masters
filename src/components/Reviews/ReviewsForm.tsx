"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { sendReviewForm } from "@/app/product/[slug]/actions";
import {
	type ProductGetLiveReviewsQuery,
	type ProductGetPreviewReviewsQuery,
} from "@/gql/graphql";

interface ComponentProps {
	productId: string;
	reviewsLive: ProductGetLiveReviewsQuery;
	reviewPreview: ProductGetPreviewReviewsQuery;
}

export const ReviewsForm = ({
	productId,
	reviewPreview,
	reviewsLive,
}: ComponentProps) => {
	const [optimisticPreviewReviews, setOptimisticPreviewReviews] = useOptimistic(
		reviewPreview.reviews?.data || [],
	);

	async function handleSendReviewAction(formData: FormData) {
		const res = await sendReviewForm(formData, productId);
		// @ts-ignore
		setOptimisticPreviewReviews([...(reviewPreview.reviews?.data || []), res]);
	}

	return (
		<div className="flex gap-10">
			<div className="flex flex-col gap-4">
				<h5>Recenzja</h5>
				<form
					data-testid="add-review-form"
					className="flex flex-col gap-2"
					action={handleSendReviewAction}
				>
					<input
						required
						placeholder="Tytuł opini"
						type="text"
						name="headline"
					/>
					<textarea required placeholder="Opinia" name="content" />
					<input
						type="range"
						name="rating"
						min="1"
						max="5"
						step="1"
						defaultValue="5"
						placeholder="Ocena"
						required
					/>
					<input required placeholder="Imię" type="text" name="name" />
					<input required placeholder="email" type="email" name="email" />
					<button type="submit">Wyślij opinię</button>
				</form>
			</div>
			<div className="flex grow flex-col gap-4">
				{reviewsLive.reviews?.data.length === 0 &&
				reviewPreview.reviews?.data.length === 0 &&
				optimisticPreviewReviews.length === 0 ? (
					<h2>Brak opini o produkcie</h2>
				) : (
					<>
						{[...(optimisticPreviewReviews || [])].map((review, index) => (
							<div key={index} className="opacity-40">
								<h2 className="text-xl">
									{review.attributes?.name} {review.attributes?.rating}/5
								</h2>
								<span className="text-sm text-slate-700">
									{review.attributes?.title}
								</span>
								<p className="text-sm">{review.attributes?.content}</p>
							</div>
						))}
						{[...(reviewsLive.reviews?.data || [])].map((review, index) => (
							<div key={index}>
								<h2 className="text-xl">
									{review.attributes?.name} {review.attributes?.rating}/5
								</h2>
								<span className="text-sm text-slate-700">
									{review.attributes?.title}
								</span>
								<p className="text-sm">{review.attributes?.content}</p>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
};
