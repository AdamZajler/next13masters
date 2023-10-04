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
    "query ProductGetBySlug($slug: String!) {\n  products(filters: {slug: {eq: $slug}}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}": types.ProductGetBySlugDocument,
    "query GetRelatedProducts($slug: String!) {\n  products(filters: {slug: {not: {eq: $slug}}}, pagination: {limit: 4}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}": types.GetRelatedProductsDocument,
    "fragment ProductListItem on ProductEntity {\n  id\n  attributes {\n    slug\n    title\n    description\n    price\n    images {\n      data {\n        attributes {\n          url\n          alternativeText\n        }\n      }\n    }\n    categories\n  }\n}": types.ProductListItemFragmentDoc,
    "query ProductsGetByCategorySlug($page: Int!, $slug: String!) {\n  products(\n    pagination: {page: $page, pageSize: 3}\n    filters: {categories: {eq: $slug}}\n  ) {\n    data {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetList($page: Int!) {\n  products(pagination: {page: $page, pageSize: 3}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetBySlug($slug: String!) {\n  products(filters: {slug: {eq: $slug}}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductGetBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRelatedProducts($slug: String!) {\n  products(filters: {slug: {not: {eq: $slug}}}, pagination: {limit: 4}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').GetRelatedProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on ProductEntity {\n  id\n  attributes {\n    slug\n    title\n    description\n    price\n    images {\n      data {\n        attributes {\n          url\n          alternativeText\n        }\n      }\n    }\n    categories\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($page: Int!, $slug: String!) {\n  products(\n    pagination: {page: $page, pageSize: 3}\n    filters: {categories: {eq: $slug}}\n  ) {\n    data {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($page: Int!) {\n  products(pagination: {page: $page, pageSize: 3}) {\n    data {\n      ...ProductListItem\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
