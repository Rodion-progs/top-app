import { AdvantagesProps } from './Advantages.props';

import CheckIcon from './icons/check.svg';
import styles from './Advantages.module.css';

const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map((a) => (
				<div className={styles.advantage} key={a._id}>
					<CheckIcon />
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vline} />
					<div className={styles.description}>{a.description}</div>
				</div>
			))}
		</>
	);
};

export default Advantages;
