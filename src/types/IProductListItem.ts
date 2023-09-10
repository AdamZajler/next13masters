export interface IProductListItem {
	title: string;
	price: number;
	categories: { title: string; url: string }[];
	image: {
		main: {
			url: string;
			alt?: string;
		};
		hover: {
			url: string;
			alt?: string;
		};
	};
}
