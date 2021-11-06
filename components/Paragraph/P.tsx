import React from 'react';
import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

const P = ({ size = 'm', className, children, ...props }: PProps): JSX.Element => {
	return React.createElement('p', { className: cn(className, styles[size]), ...props }, children);
};

export default P;