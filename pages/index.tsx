import { Htag, Button, P, Tag, Rating } from '../components';
import React, { useState } from 'react';
import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { TopPageComponent } from '../page-components';

const Home = ({ menu, firstCategory, product }: HomeProps): JSX.Element => {
	const [rating, setRating] = useState(4);

	return (
		<div>
			Главная
		</div>

	);
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory,
		}
	};
};


interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}


