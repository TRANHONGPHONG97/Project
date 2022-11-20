import useCollapse from 'react-collapsed';
import { faAngleRight, faAngleDown, faListDots, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
function SidebarComponent() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <p className="nav-link collapsed" href="#" {...getToggleProps()}>
                {/* <i className="fas fa-fw fa-cog" /> */}
                <FontAwesomeIcon className="fas fa-fw fa-cog" icon={faListDots} />
                <span>Quản lý sản phẩm</span>
                <i className="iconSidebar">
                    {isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
                </i>
            </p>
            <div id="collapseTwo" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded" style={{padding: '5px'}}>
                    <FontAwesomeIcon icon={faProductHunt} style={{marginRight: '5px'}} />
                    <Link to="/list-product">Sản phẩm</Link>
                    <br />
                    <FontAwesomeIcon icon={faCaretDown} style={{marginRight: '5px'}} />
                    <Link to="/dashboard/category">Thể loại</Link>
                </div>
            </div>
        </li>
    );
}

export default SidebarComponent;
