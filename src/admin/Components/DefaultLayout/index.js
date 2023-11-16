import classNames from 'classnames/bind';
import Header from "./Header";
import Footer from "./Footer"



function AdminDefaultLayout({children}) {
    return (
        <>
            <Header />
            
            <Footer />
        </>
      );
}

export default AdminDefaultLayout;