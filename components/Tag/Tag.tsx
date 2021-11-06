import React from 'react';
import Link from 'next/link';
import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

const Tag = ({ tag = 'div', className, color = 'ghost', size = 's', path, href, children, ...props }: TagProps): JSX.Element => {
	return React.createElement(
		tag,
		{ className: cn(className, styles.tag, styles[size], styles[color]), href, ...props },
		path ? <Link href={path}>children</Link> : children
	);
};

export default Tag;