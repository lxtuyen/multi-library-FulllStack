import classNames from 'classnames/bind';

import styles from './Sort.module.scss';

const cx = classNames.bind(styles);


const Sort = ({ sort, setSort }) => {
	const onSelectChange = ({ currentTarget: input }) => {
		setSort({ sort: input.value, order: sort.order });
	};

	const onArrowChange = () => {
		if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
	};

	return (
		<div className={cx('wrapper')}>
			<p className={cx('sort_by')}>Sắp xếp theo :</p>
			<select
				onChange={onSelectChange}
				className={cx('select')}
				defaultValue={cx('sort')}
			>
				<option value="avgRating">đánh giá</option>
				<option value="createdAt">Ngày đăng</option>
			</select>
			<button className={cx('arrow_btn')} onClick={onArrowChange}>
				<p className={cx('up_arrow')}>&uarr;</p>
				<p className={cx('down_arrow')}>&darr;</p>
			</button>
		</div>
	);
};

export default Sort;