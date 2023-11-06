import classNames from 'classnames/bind';
import React, { useContext, useState } from 'react';

import styles from './Home.module.scss';

import images from '~/assets/images';
import Slider from '~/components/Layout/components/Slider';
import Carouse from '~/components/Layout/components/Carouse';
import { FeaturedTable } from '~/components/Table';
import { AuthContext } from '~/context/AuthContext';
import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/hooks/config';

const cx = classNames.bind(styles);

function Home() {
    const { user } = useContext(AuthContext);
    const id = user?.data._id

    const { data: followed } = useFetch(`${BASE_URL}/users/${id}`);

    return (
        <>
         <Slider />
         <div className={cx('wrapper-card')}>
         <div className={cx('carouse')}>
            <Carouse
             image={images.read}
             title='Đọc sách thư viện miễn phí trực tuyến'
             text='Hàng triệu cuốn sách có sẵn thông qua cho vay kỹ thuật số có kiểm soát'
             />
             <Carouse
             image={images.track}
             title='Theo dõi những cuốn sách yêu thích của bạn'
             text='Sắp xếp Sách của bạn bằng Danh sách nhật ký Đọc'
             />
              <Carouse
             image={images.library_explorer}
             title='Dùng thử Thư viện ảo Explorer'
             text='Kệ kỹ thuật số được tổ chức như một thư viện vật lý'
             />
              <Carouse
             image={images.fulltext}
             title='Thử tìm kiếm toàn văn bản'
             text='Tìm kết quả phù hợp trong văn bản của hàng triệu cuốn sách'
             />
             <Carouse
             image={images.librarian}
             title='Hãy là một thủ thư mở'
             text='Hàng chục cách bạn có thể giúp cải thiện thư viện'
             />
         </div>
         <div className={cx('title')}>
            <span>Sách Mới</span>
         </div>
         <FeaturedTable followed={followed} />
         </div>
        </>
    );
}
export default Home