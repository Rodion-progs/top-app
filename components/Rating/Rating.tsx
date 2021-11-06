import { useState, useEffect, KeyboardEvent, forwardRef, ForwardedRef } from 'react';
import cn from 'classnames';

import { RatingProps } from './Rating.props';

import StarIcon from './star.svg';
import styles from './Rating.module.css';

const Rating = forwardRef(
	(
		{ rating, isEditable = false, setRating, error, className, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>,
	): JSX.Element => {
		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

		useEffect(() => {
			constructRating(rating);
		}, [rating]);

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						className={cn(styles.star, className, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable,
						})}
						onClick={() => onClick(i + 1)}
					>
						<StarIcon
							tabIndex={isEditable ? 0 : -1}
							onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleSpace(i + 1, e)}
						/>
					</span>
				);
			});

			setRatingArray(updatedArray);
		};

		const changeDisplay = (i: number) => {
			if (!isEditable) {
				return;
			}

			constructRating(i);
		};

		const onClick = (i: number) => {
			if (!setRating) {
				return;
			}

			setRating(i);
		};

		const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
			if (e.code !== 'Space' || !setRating) {
				return;
			}

			setRating(i);
		};

		return (
			<div
				className={cn(styles.ratingWrapper, {
					[styles.error]: error,
				})}
				{...props}
				ref={ref}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}

				{error && <span className={styles.errorMessage}>{error.message}</span>}
			</div>
		);
	},
);

export default Rating;
