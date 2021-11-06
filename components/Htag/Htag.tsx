import React from 'react';
import { HtagProps } from './Htag.props';
import styles from './Htag.module.css';

const Htag = ({ tag, children }: HtagProps): JSX.Element => {
	return React.createElement(tag, { className: styles[tag] }, children);
};

export default Htag;