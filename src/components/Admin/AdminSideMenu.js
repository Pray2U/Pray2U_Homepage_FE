import { Link, useLocation } from "react-router-dom";
import { AiOutlineTeam, AiOutlineShoppingCart, AiOutlineUnorderedList } from "react-icons/ai";

import '../../styles/Admin/AdminSideMenu.scss';

const AdminSideMenu = () => {

    const location = useLocation();
    const path = location.pathname.split('/');
    const currentPath = path[path.length-1];

    const AdminSideMenuLists = [
        {
            link:'user',
            title:'유저 관리',
            icon: <AiOutlineTeam className="AdminSideMenuIcon"/>
        },
        {
            link:'shop',
            title:'아이템 관리',
            icon: <AiOutlineUnorderedList className="AdminSideMenuIcon"/>
        },
        {
            link:'order',
            title:'주문 승인',
            icon: <AiOutlineShoppingCart className="AdminSideMenuIcon"/>
        },
    ]

    return(
        <div className="AdminSideMenuContainer">
            <div className="AdminSideMenuTitle">관리자 메뉴</div>
            {
                AdminSideMenuLists.map((menu) =>
                <Link
                    to={`/admin/${menu?.link}`} 
                    key={menu?.link}
                    className={menu?.link === currentPath ? "SelectedSideMenu" : "SideMenu"}>
                    { menu?.icon }
                    <div className="SideMenuTitle">{menu?.title}</div>
                </Link>)
            }
        </div>
    );
}

export default AdminSideMenu;