
import Footer from "../Admin/Footer";
import Header from "../Admin/Header";

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