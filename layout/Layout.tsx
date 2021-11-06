import React, { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import { AppContextProvider, IAppContext } from '../context/app.context';

const Layout = ({ className, children }: LayoutProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div className={styles.body}>
				{children}
			</div>
			<Footer className={styles.footer} />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		console.log(props);

		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory} >
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};