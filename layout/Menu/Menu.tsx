import React, { useContext } from 'react';
import styles from './Menu.module.css';
import cn from 'classnames';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);


	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: '20',
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1,
			},
		},
		hidden: { marginBottom: 0 },
	};

	const variantsChildrens = {
		visible: {
			opacity: 1,
			height: 29,
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondCategory === secondCategory) {
						m.isOpened = !m.isOpened;
					}

					return m;
				}),
			);
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map((m) => (
					<div key={m.route}>
						<Link href={`/${m.route}`}>
							<a>
								<div
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: m.id === firstCategory,
									})}
								>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>

						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		console.log(menu, '==');

		return (
			<div className={styles.secondBlock}>
				{menu && menu.map((m) => {
					if (m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}

					return (
						<div key={m._id.secondCategory}>
							<div
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
							>
								{m._id.secondCategory}
							</div>



							<motion.div
								className={cn(styles.secondLevelBlock)}
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
							>
								{buildThirdLevel(m.pages, menuItem.route)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((p) => (
			// <motion.div key={p._id} variants={variantsChildrens}>
			<Link href={`/${route}/${p.alias}`} key={p._id}>
				<a
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
					})}
				>
					{p.category}
				</a>
			</Link>
			// </motion.div>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};

export default Menu;