import { useReducer, useEffect } from 'react';

import { TopLevelCategory } from '../../interfaces/page.interface';

import { TopPageComponentProps } from './TopPageComponent.props';
import { SortEnum } from '../../components/Sort/Sort.props';

import { Htag, Tag, HhData, Advantages, Sort, Product } from '../../components';

import { sortReducer } from './sort.reducer';

import styles from './TopPageComponent.module.css';
import { useScrollY } from '../../hooks/useScrollY';

export const TopPageComponent = ({
	firstCategory,
	page,
	products,
}: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
		products,
		sort: SortEnum.Rating,
	});

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	useEffect(() => {
		dispatchSort({ type: 'reset', initialState: products });
	}, [products]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag="h1">{page.title}</Htag>
				{sortedProducts && (
					<Tag color="gray" size="m">
						{sortedProducts.length}
					</Tag>
				)}

				<Sort sort={sort} setSort={setSort} />
			</div>

			<div>
				{sortedProducts && sortedProducts.map((p) => <Product layout key={p._id} product={p} />)}
			</div>

			<div className={styles.hhTitle}>
				<Htag tag="h2">Вакансии - {page.category}</Htag>

				<Tag color="red" size="m">
					hh.ru
				</Tag>
			</div>

			{firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}

			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag="h2">Преимущества</Htag>
					<Advantages advantages={page.advantages} />
				</>
			)}

			{page.seoText && (
				<div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />
			)}

			<Htag tag="h2">Получаемые навыки</Htag>

			{page.tags.map((t) => (
				<Tag key={t} color="primary">
					{t}
				</Tag>
			))}
		</div>
	);
};
