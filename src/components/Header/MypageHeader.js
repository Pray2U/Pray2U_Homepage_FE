import { Link, useLocation } from "react-router-dom";

import '../../styles/Header/MypageHeader.scss';

const MypageHeader = () =>{

    const location = useLocation();
    const path = location.pathname.split('/');
    const currentPath = path[path.length-1];

    const userHeaders = [
        {
            link:'profile',
            title:'프로필',
        },
        {
            link:'attendance',
            title:'출석관리',
        },
        {
            link:'mytil',
            title:'My TIL',
        },
        {
            link:'myshop',
            title:'My Shop',
        },
    ]

    return(
        <div className="MyPageHeaderBox">
            {
                userHeaders.map((menu) =>
                <Link
                    to={`/mypage/${menu?.link}`} 
                    key={menu?.link}
                    className={menu?.link === currentPath ? "SelectedMenu" : "Menu"}>{menu?.title}</Link>
                )
            }
        </div>
    );
}

export default MypageHeader;