
import Footer from "../Admin/Footer";
import Header from "../Admin/Header";
// import Header from "/client/src/Components/Layout/DefaultLayout/Admin/Header/index"

function DefaultLayout({children}) {
    return (
        <div>
            <Header />
            <div>
                <div>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
      );
}

export default DefaultLayout;