import { withLayout } from '../../layout/Layout';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { GetStaticPaths } from 'next';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'querystring';
import { API } from '../../helpers/api';

function Type({ firstCategory }: TypeProps): JSX.Element {
	return <>Type {firstCategory}</>;
}

export default withLayout(Type);


export const getStaticPaths: GetStaticPaths = async () => {

	return {
		paths: firstLevelMenu.map(m => ({ params: { type: '/' + m.route } })),
		fallback: true
	};

};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}
	const firstCategory = firstLevelMenu.find(m => m.route === params.type);
	console.log(firstCategory);

	if (!firstCategory) {
		return {
			notFound: true
		};
	}

	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory: firstCategory.id
	});



	return {
		props: {
			menu,
			firstCategory: firstCategory.id,
		}
	};
};


interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}