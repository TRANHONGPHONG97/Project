import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useCollapse from 'react-collapsed';

function SidebarUtilities() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" {...getToggleProps()}>
                <i className="fas fa-fw fa-wrench" />
                <span>Utilities</span>
                <i className='iconSidebar'>{isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</i>
            </a>
            <div id="collapseUtilities" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Custom Utilities:</h6>
                    <a className="collapse-item" href="utilities-color.html">
                        Colors
                    </a>
                    <a className="collapse-item" href="utilities-border.html">
                        Borders
                    </a>
                    <a className="collapse-item" href="utilities-animation.html">
                        Animations
                    </a>
                    <a className="collapse-item" href="utilities-other.html">
                        Other
                    </a>
                </div>
            </div>
        </li>
    );
}

export default SidebarUtilities;
