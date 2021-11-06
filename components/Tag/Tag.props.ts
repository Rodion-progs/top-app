import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
	tag?: keyof JSX.IntrinsicElements,
	size?: 's' | 'm';
	color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
	href?: string;
	path?: string;
	className?: string;
	children: ReactNode;
}
