import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '~/context/AuthContext';

function Header(){
    const [isSidebarToggled, setIsSidebarToggled] = useState(false);

    const handleToggleClick = () => {
      setIsSidebarToggled(!isSidebarToggled);
      localStorage.setItem('sb|sidebar-toggle', !isSidebarToggled);
  
      document.body.classList.toggle('sb-sidenav-toggled');
    }
    return (
        <div className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            
            <Link className="navbar-brand ps-3" to="/">Multi_library</Link>
            
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={handleToggleClick} href="#!"><i className="fas fa-bars"></i></button>
            
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            <Setting/>   
        </div>
    )
}
function Setting(){
    const navitage = useNavigate();
    const { user, dispatch, role } = useContext(AuthContext);
    console.log(user.role);
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navitage('/');
    };
    return (
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="#!"></Link></li>
                        <li><Link className="dropdown-item" to="#!">Home</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li> 
                            <Link className="dropdown-item" onClick={logout}>
                                Log out
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
    )
}

export default Header;