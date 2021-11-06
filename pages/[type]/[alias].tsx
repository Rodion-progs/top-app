import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import { MenuItem } from '../../interfaces/menu.interface';
import axios from 'axios';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { ParsedUrlQuery } from 'querystring';
import { firstLevelMenu } from '../../helpers/helpers';
import React from 'react';
import { TopPageComponent } from '../../page-components';
import { API } from '../../helpers/api';

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
	return <TopPageComponent page={page} products={products} firstCategory={firstCategory} />;
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	interface Path {
		params: {
			alias: string;
		};
	}


	let paths: Path[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: m.id
		});
		paths = paths.concat(menu.flatMap(s => s.pages.map(p => ({ params: { alias: p.alias, type: m.route } }))));
	}

	return {
		paths,
		fallback: true
	};

};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		};
	}

	const firstCategory = firstLevelMenu.find(m => m.route === params.type);

	if (!firstCategory) {
		return {
			notFound: true
		};
	}
	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategory.id
		});

		if (menu.length === 0) {
			return {
				notFound: true
			};
		}

		const { data: page } = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);

		const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
			category: page.category,
			limit: 10,
		});

		return {
			props: {
				menu,
				firstCategory: firstCategory.id,
				page,
				products
			}
		};
	} catch {
		return {
			notFound: true
		};
	}
};

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}