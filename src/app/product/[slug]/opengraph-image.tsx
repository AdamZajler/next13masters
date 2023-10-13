import { ImageResponse } from "next/server";
import { ProductGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQl } from "@/lib/executeGraphQl";

export const runtime = "edge";
export const alt = "Ecommerce";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

type ProductOpengraphImageProps = {
	params: {
		slug: string;
	};
};

export default async function ProductOpengraphImage({
	params,
}: ProductOpengraphImageProps) {
	const products = await executeGraphQl({
		query: ProductGetBySlugDocument,
		variables: {
			slug: params.slug,
		},
	});

	if (!products.products?.data || !products.products.data[0]?.attributes) {
		return new ImageResponse(<>Ecommerce</>, {
			width: 1200,
			height: 630,
		});
	}

	const product = products.products.data[0].attributes;

	if (!product) {
		return new ImageResponse(<>Ecommerce</>, {
			width: 1200,
			height: 630,
		});
	}

	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 24,
					color: "white",
					background: "#000",
					width: "100%",
					height: "100%",
					flexDirection: "row",
					justifyContent: "flex-start",
					alignItems: "flex-start",
					display: "flex",
					gap: "25px",
				}}
			>
				<div
					style={{
						background: "#ffcc00",
						width: "12px",
						height: "100%",
					}}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						flexBasis: "70%",
						padding: "50px",
						alignSelf: "center",
					}}
				>
					<h1
						style={{
							color: "#ffcc00",
						}}
					>
						{product.title}
					</h1>
					<p>| {product.categories[0]} |</p>
					<p>{product.description}</p>
				</div>
				<div
					style={{
						margin: "50px 0",
						flexBasis: "20%",
						borderRadius: "32px",
						border: "solid 5px #fff",
						background: "#ffcc00",
						display: "flex",
						padding: "10px",
					}}
				>
					<img
						style={{
							objectFit: "cover",
							aspectRatio: "1/1",
						}}
						alt="product"
						src={product.images.data[0]?.attributes?.url}
					/>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}
