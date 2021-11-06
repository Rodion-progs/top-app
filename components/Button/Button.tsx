import { useEffect } from 'react';
import cn from 'classnames';
import { motion, useMotionValue } from 'framer-motion';

import { ButtonProps } from './Button.props';

import ArrowIcon from './arrow.svg';
import styles from './Button.module.css';

const Button = ({
	appearance,
	children,
	className,
	arrow = 'none',
	...props
}: ButtonProps): JSX.Element => {
	return (
		<motion.button
			className={cn(styles.button, className, {
				[styles.primary]: appearance === 'primary',
				[styles.ghost]: appearance === 'ghost',
			})}
			whileHover={{ scale: 1.05 }}
			{...props}
		>
			{children}
			{arrow !== 'none' && (
				<span
					className={cn(styles.arrow, {
						[styles.down]: arrow === 'down',
					})}
				>
					<ArrowIcon />
				</span>
			)}
		</motion.button>
	);
};


export default Button;
