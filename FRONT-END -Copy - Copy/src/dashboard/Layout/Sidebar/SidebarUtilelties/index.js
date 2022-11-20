import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faAngleRight, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCollapse from 'react-collapsed';
import { Link } from 'react-router-dom';

function SidebarUtilities() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" {...getToggleProps()}>
                <FontAwesomeIcon className="fas fa-fw fa-cog" icon={faUsers} />
                <span>Quản lý Tài khoản</span>
                <i className="iconSidebar">
                    {isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
                </i>
            </a>
            <div id="collapseUtilities" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded" style={{padding: '5px'}}>
                    <FontAwesomeIcon icon={faUser} style={{marginRight: '5px'}} />
                    <Link to="/list-account">Tài khoản</Link>
                </div>
            </div>
        </li>
    );
}

export default SidebarUtilities;
