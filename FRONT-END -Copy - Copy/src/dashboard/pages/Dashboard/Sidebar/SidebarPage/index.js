import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCollapse from 'react-collapsed';

function SidebarPage() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" {...getToggleProps()}>
                <i className="fas fa-fw fa-folder" />
                <span>Pages</span>
                <i className='iconSidebar'>{isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</i>
            </a>
            <div id="collapsePages" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Login Screens:</h6>
                    <a className="collapse-item" href="login.html">
                        Login
                    </a>
                    <a className="collapse-item" href="register.html">
                        Register
                    </a>
                    <a className="collapse-item" href="forgot-password.html">
                        Forgot Password
                    </a>
                    <div className="collapse-divider" />
                    <h6 className="collapse-header">Other Pages:</h6>
                    <a className="collapse-item" href="404.html">
                        404 Page
                    </a>
                    <a className="collapse-item" href="blank.html">
                        Blank Page
                    </a>
                </div>
            </div>
        </li>
    );
}

export default SidebarPage;
