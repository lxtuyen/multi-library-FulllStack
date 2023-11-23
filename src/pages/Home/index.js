import classNames from 'classnames/bind';
import React, { useContext } from 'react';

import styles from './Home.module.scss';

import Slider from '~/Components/Layout/components/Slider';
import Carousel from '~/Components/Layout/components/Carousel';
import { FeaturedTable } from '~/Components/Table';
import { AuthContext } from '~/context/AuthContext';
import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);

function Home() {
    const { user } = useContext(AuthContext);
    const id = user?.data._id;

    const { data: followed } = useFetch(`${BASE_URL}/users/${id}`);
    const { data: Carousels } = useFetch(`${BASE_URL}/admin/carousel`);

    return (
        <>
            <Slider />
            <div className={cx('wrapper-card')}>
                <div className={cx('carouse')}>
                    {Carousels?.map((carousel) => (
                        <Carousel key={carousel._id} carousel={carousel} />
    ))}
                </div>
                <div className={cx('title')}>
                    <span>Sách Mới</span>
                </div>
                {<FeaturedTable followed={followed} />}
            </div>
        </>
    );
}
export default Home;
