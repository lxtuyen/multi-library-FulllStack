import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer"
import "~/admin/styles/index.css"


function AdminDefaultLayout({children}) {
    return (
        <>
            <Header />
            <div id="layoutSidenav">
                <Sidebar/>
                {children}
            </div>
            
        </>
      );
}

export default AdminDefaultLayout;