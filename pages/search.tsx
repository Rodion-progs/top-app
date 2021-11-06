import { withLayout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

function Search(): JSX.Element {
	return <></>;
}

export default withLayout(Search);


export const getStaticProps: GetStaticProps<HomeProps> = async () => {

	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory: 0
	});
	return {
		props: {
			menu,
			firstCategory: 0,
		}
	};
};


interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}