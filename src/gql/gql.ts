/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CartAddProduct($orderId: ID!, $productId: ID!, $qty: Int = 1) {\n  createCartItem(data: {qty: $qty, product: $productId, order: $orderId}) {\n    data {\n      id\n    }\n  }\n}": types.CartAddProductDocument,
    "mutation CartChangeCartItemQty($cartItemId: ID!, $orderId: ID!, $productId: ID!, $qty: Int!) {\n  updateCartItem(\n    id: $cartItemId\n    data: {product: $productId, order: $orderId, qty: $qty}\n  ) {\n    data {\n      id\n    }\n  }\n}": types.CartChangeCartItemQtyDocument,
    "mutation CartCreate($email: String!) {\n  createOrder(data: {cart_items: [], publishedAt: null, email: $email}) {\n    data {\n      ...Cart\n    }\n  }\n}": types.CartCreateDocument,
    "mutation CartDeleteProduct($itemId: ID!) {\n  deleteCartItem(id: $itemId) {\n    data {\n      id\n    }\n  }\n}": types.CartDeleteProductDocument,
    "query CartGetByEmail($email: String!) {\n  orders(filters: {email: {eq: $email}}) {\n    data {\n      id\n      attributes {\n        email\n        cart_item {\n          data {\n            id\n            attributes {\n              qty\n              product {\n                data {\n                  ...ProductListItem\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.CartGetByEmailDocument,
    "query GetCartById($id: ID!) {\n  orders(filters: {id: {eq: $id}}, publicationState: PREVIEW) {\n    data {\n      ...Cart\n    }\n  }\n}": types.GetCartByIdDocument,
    "fragment Cart on OrderEntity {\n  id\n  attributes {\n    cart_item {\n      data {\n        id\n        attributes {\n          qty\n          product {\n            data {\n              id\n              attributes {\n                title\n                price\n                slug\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.CartFragmentDoc,
    "mutation CartSetOrderCompleted($orderId: ID!, $date: DateTime!) {\n  updateOrder(id: $orderId, data: {publishedAt: $date}) {\n    data {\n      id\n    }\n  }\n}": types.CartSetOrderCompletedDocument,
    "mutation CartSetProductQty($itemId: ID!, $qty: Int!) {\n  updateCartItem(id: $itemId, data: {qty: $qty}) {\n    data {\n      id\n    }\n  }\n}": types.CartSetProductQtyDocument,
    "mutation ProductAddReview($title: String!, $content: String!, $rating: Int!, $name: String!, $email: String!, $productId: ID!) {\n  createReview(\n    data: {title: $title, content: $content, rating: $rating, name: $name, email: $email, product: $productId}\n  ) {\n    data {\n      id\n      attributes {\n        title\n        content\n        rating\n        name\n        email\n      }\n    }\n  }\n}": types.ProductAddReviewDocument,
    "query ProductGetAllReveiwsLive($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: LIVE\n  ) {\n    data {\n      attributes {\n        rating\n      }\n    }\n  }\n}": types.ProductGetAllReveiwsLiveDocument,
    "query ProductGetAllReveiwsPreview($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: PREVIEW\n  ) {\n    data {\n      attributes {\n        rating\n      }\n    }\n  }\n}": types.ProductGetAllReveiwsPreviewDocument,
    "query ProductGetBySlug($slug: String!) {\n  products(filters: {slug: {eq: $slug}}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}": types.ProductGetBySlugDocument,
    "query ProductGetLiveReviews($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: LIVE\n  ) {\n    data {\n      ...ProductReviews\n    }\n  }\n}": types.ProductGetLiveReviewsDocument,
    "query ProductGetPreviewReviews($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: PREVIEW\n  ) {\n    data {\n      ...ProductReviews\n    }\n  }\n}": types.ProductGetPreviewReviewsDocument,
    "query GetRelatedProducts($slug: String!) {\n  products(filters: {slug: {not: {eq: $slug}}}, pagination: {limit: 4}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}": types.GetRelatedProductsDocument,
    "fragment ProductListItem on ProductEntity {\n  id\n  attributes {\n    slug\n    title\n    description\n    price\n    images {\n      data {\n        attributes {\n          url\n          alternativeText\n        }\n      }\n    }\n    categories\n    size\n    colors\n    reviews_avg\n  }\n}": types.ProductListItemFragmentDoc,
    "fragment ProductReviews on ReviewEntity {\n  id\n  attributes {\n    title\n    content\n    rating\n    name\n    email\n    createdAt\n  }\n}": types.ProductReviewsFragmentDoc,
    "mutation ProductSetReviewsAvg($productId: ID!, $reviewsAvg: Float!) {\n  updateProduct(id: $productId, data: {reviews_avg: $reviewsAvg}) {\n    data {\n      id\n    }\n  }\n}": types.ProductSetReviewsAvgDocument,
    "query ProductsGetByCategorySlug($page: Int!, $slug: String!, $sort: [String] = [\"price:asc\"]) {\n  products(\n    pagination: {page: $page, pageSize: 3}\n    filters: {categories: {eq: $slug}}\n    sort: $sort\n  ) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      pagination {\n        pageCount\n        page\n      }\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetCollectionsBySlug($slug: String!) {\n  collections(filters: {slug: {eq: $slug}}) {\n    data {\n      id\n      attributes {\n        title\n        slug\n        products {\n          data {\n            ...ProductListItem\n          }\n        }\n      }\n    }\n  }\n}": types.ProductsGetCollectionsBySlugDocument,
    "query ProductsGetCollections {\n  collections {\n    data {\n      id\n      attributes {\n        title\n        slug\n        image {\n          data {\n            attributes {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.ProductsGetCollectionsDocument,
    "query ProductsGetList($page: Int!, $sort: [String] = [\"price:asc\"]) {\n  products(pagination: {page: $page, pageSize: 4}, sort: $sort) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      pagination {\n        pageCount\n        page\n      }\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListByPrice($page: Int!) {\n  products(pagination: {page: $page, pageSize: 4}, sort: [\"price\"]) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      pagination {\n        pageCount\n        page\n      }\n    }\n  }\n}": types.ProductsGetListByPriceDocument,
    "query SearchGetProductsByQuery($query: String!) {\n  products(filters: {title: {startsWith: $query}}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}": types.SearchGetProductsByQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($orderId: ID!, $productId: ID!, $qty: Int = 1) {\n  createCartItem(data: {qty: $qty, product: $productId, order: $orderId}) {\n    data {\n      id\n    }\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeCartItemQty($cartItemId: ID!, $orderId: ID!, $productId: ID!, $qty: Int!) {\n  updateCartItem(\n    id: $cartItemId\n    data: {product: $productId, order: $orderId, qty: $qty}\n  ) {\n    data {\n      id\n    }\n  }\n}"): typeof import('./graphql').CartChangeCartItemQtyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate($email: String!) {\n  createOrder(data: {cart_items: [], publishedAt: null, email: $email}) {\n    data {\n      ...Cart\n    }\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartDeleteProduct($itemId: ID!) {\n  deleteCartItem(id: $itemId) {\n    data {\n      id\n    }\n  }\n}"): typeof import('./graphql').CartDeleteProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetByEmail($email: String!) {\n  orders(filters: {email: {eq: $email}}) {\n    data {\n      id\n      attributes {\n        email\n        cart_item {\n          data {\n            id\n            attributes {\n              qty\n              product {\n                data {\n                  ...ProductListItem\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartGetByEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCartById($id: ID!) {\n  orders(filters: {id: {eq: $id}}, publicationState: PREVIEW) {\n    data {\n      ...Cart\n    }\n  }\n}"): typeof import('./graphql').GetCartByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Cart on OrderEntity {\n  id\n  attributes {\n    cart_item {\n      data {\n        id\n        attributes {\n          qty\n          product {\n            data {\n              id\n              attributes {\n                title\n                price\n                slug\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').CartFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetOrderCompleted($orderId: ID!, $date: DateTime!) {\n  updateOrder(id: $orderId, data: {publishedAt: $date}) {\n    data {\n      id\n    }\n  }\n}"): typeof import('./graphql').CartSetOrderCompletedDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQty($itemId: ID!, $qty: Int!) {\n  updateCartItem(id: $itemId, data: {qty: $qty}) {\n    data {\n      id\n    }\n  }\n}"): typeof import('./graphql').CartSetProductQtyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProductAddReview($title: String!, $content: String!, $rating: Int!, $name: String!, $email: String!, $productId: ID!) {\n  createReview(\n    data: {title: $title, content: $content, rating: $rating, name: $name, email: $email, product: $productId}\n  ) {\n    data {\n      id\n      attributes {\n        title\n        content\n        rating\n        name\n        email\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductAddReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetAllReveiwsLive($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: LIVE\n  ) {\n    data {\n      attributes {\n        rating\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetAllReveiwsLiveDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetAllReveiwsPreview($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: PREVIEW\n  ) {\n    data {\n      attributes {\n        rating\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetAllReveiwsPreviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetBySlug($slug: String!) {\n  products(filters: {slug: {eq: $slug}}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetLiveReviews($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: LIVE\n  ) {\n    data {\n      ...ProductReviews\n    }\n  }\n}"): typeof import('./graphql').ProductGetLiveReviewsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetPreviewReviews($productId: ID!) {\n  reviews(\n    filters: {product: {id: {eq: $productId}}}\n    pagination: {pageSize: 10000}\n    publicationState: PREVIEW\n  ) {\n    data {\n      ...ProductReviews\n    }\n  }\n}"): typeof import('./graphql').ProductGetPreviewReviewsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRelatedProducts($slug: String!) {\n  products(filters: {slug: {not: {eq: $slug}}}, pagination: {limit: 4}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').GetRelatedProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on ProductEntity {\n  id\n  attributes {\n    slug\n    title\n    description\n    price\n    images {\n      data {\n        attributes {\n          url\n          alternativeText\n        }\n      }\n    }\n    categories\n    size\n    colors\n    reviews_avg\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductReviews on ReviewEntity {\n  id\n  attributes {\n    title\n    content\n    rating\n    name\n    email\n    createdAt\n  }\n}"): typeof import('./graphql').ProductReviewsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProductSetReviewsAvg($productId: ID!, $reviewsAvg: Float!) {\n  updateProduct(id: $productId, data: {reviews_avg: $reviewsAvg}) {\n    data {\n      id\n    }\n  }\n}"): typeof import('./graphql').ProductSetReviewsAvgDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($page: Int!, $slug: String!, $sort: [String] = [\"price:asc\"]) {\n  products(\n    pagination: {page: $page, pageSize: 3}\n    filters: {categories: {eq: $slug}}\n    sort: $sort\n  ) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      pagination {\n        pageCount\n        page\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCollectionsBySlug($slug: String!) {\n  collections(filters: {slug: {eq: $slug}}) {\n    data {\n      id\n      attributes {\n        title\n        slug\n        products {\n          data {\n            ...ProductListItem\n          }\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetCollectionsBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetCollections {\n  collections {\n    data {\n      id\n      attributes {\n        title\n        slug\n        image {\n          data {\n            attributes {\n              url\n            }\n          }\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($page: Int!, $sort: [String] = [\"price:asc\"]) {\n  products(pagination: {page: $page, pageSize: 4}, sort: $sort) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      pagination {\n        pageCount\n        page\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListByPrice($page: Int!) {\n  products(pagination: {page: $page, pageSize: 4}, sort: [\"price\"]) {\n    data {\n      ...ProductListItem\n    }\n    meta {\n      pagination {\n        pageCount\n        page\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListByPriceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchGetProductsByQuery($query: String!) {\n  products(filters: {title: {startsWith: $query}}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').SearchGetProductsByQueryDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
