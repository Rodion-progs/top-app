import React from 'react';
import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import { format } from 'date-fns';

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return <footer className={cn(className, styles.footer)} {...props}>
		<div>
			OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
		</div>
		<a href="#" target="_blank" className={styles.link}>Пользовательское соглашение</a>
		<a href="#" target="_blank" className={styles.link}>Политика конфиденциальности</a>
	</footer>;
};

export default Footer;