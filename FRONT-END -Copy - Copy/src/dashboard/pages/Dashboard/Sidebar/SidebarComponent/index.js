import useCollapse from 'react-collapsed';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function SidebarComponent() {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <li className="nav-item">
            <a className="nav-link collapsed" href="#" {...getToggleProps()}>
                <i className="fas fa-fw fa-cog" />
                <span>Components</span>
                <i className="iconSidebar">
                    {isExpanded ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
                </i>
            </a>
            <div id="collapseTwo" className="collapse" {...getCollapseProps()}>
                <div className="bg-white py-2 collapse-inner rounded">
                    <h6 className="collapse-header">Custom Components:</h6>
                    <a className="collapse-item" href="buttons.html">
                        Buttons
                    </a>
                    <a className="collapse-item" href="cards.html">
                        Cards
                    </a>
                </div>
            </div>
        </li>
    );
}

export default SidebarComponent;
