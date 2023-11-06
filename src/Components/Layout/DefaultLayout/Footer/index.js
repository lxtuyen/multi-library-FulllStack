import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from '../DefaultLayout.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
            <footer className="text-center text-lg-start text-muted">

                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h5 className="text-uppercase fw-bold mb-4">Multi-Library</h5>
                                <Link href="#!" className="text-reset">
                                    <img alt='Multi-Library' src={images.logo} />
                                </Link>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h5 className="text-uppercase fw-bold mb-4">CHĂM SÓC KHÁCH HÀNG</h5>
                                <p>
                                    <Link href="#!" className="text-reset">
                                    Tư Vấn Khách Hàng
                                    </Link>
                                </p>
                                <p>
                                    <Link href="#!" className="text-reset">
                                    Hướng Dẫn Mượn Trả
                                    </Link>
                                </p>
                                <p>
                                    <Link href="#!" className="text-reset">
                                    Hỗ trợ người dùng
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h5 className="text-uppercase fw-bold mb-4">Useful links</h5>
                                <p>
                                    <Link href="#!" className="text-reset">
                                        Thể Loại
                                    </Link>
                                </p>
                                <p>
                                    <Link href="#!" className="text-reset">
                                        Tìm Kiếm
                                    </Link>
                                </p>
                                <p>
                                    <Link href="#!" className="text-reset">
                                        Xếp Hạng
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h5 className="text-uppercase fw-bold mb-4">Contact</h5>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    tuyenlx.22itb@vku.udn.vn
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3"></i> + 84 977 821 662
                                </p>
                                <p>
                                    <i className="fas fa-print me-3"></i> + 84 977 821 663
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4">
                    © 2021 Copyright:
                    <Link className="text-reset fw-bold" href="https://mdbootstrap.com/">
                        MDBootstrap.com
                    </Link>
                </div>
            </footer>
    );
}

export default Footer;
