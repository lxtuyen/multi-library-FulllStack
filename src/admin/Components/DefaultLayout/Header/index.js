import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '~/context/AuthContext';

function Header(){
    
    return (
        <div class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            
            <a class="navbar-brand ps-3" href="index.html">Multi_library</a>
            
            <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
            
            <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
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
        <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#!">Settings</a></li>
                        <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr class="dropdown-divider" /></li>
                        <li> 
                            <Link onClick={logout}>
                                Log out
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
    )
}

export default Header;