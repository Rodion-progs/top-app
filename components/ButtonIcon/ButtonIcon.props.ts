import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import up from './icons/up.svg';
import menu from './icons/burger.svg';
import close from './icons/close.svg';

export const icons = {
	up,
	close,
	menu,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
	extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	icon: IconName;
	appearance: 'primary' | 'white';
}
