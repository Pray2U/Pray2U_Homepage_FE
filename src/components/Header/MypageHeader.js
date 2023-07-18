import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';

import '../../styles/Header/MypageHeader.scss';
import axios from "axios";

const MypageHeader = () =>{

    const location = useLocation();

    const headers = [
        {
            id:'info',
            title:'정보수정',
        },
        {
            id:'attend',
            title:'출석관리',
        },
        {
            id:'til',
            title:'My TIL',
        },
        {
            id:'shop',
            title:'My Shop',
        },
    ]
    const adminHeaders = [
        {
            id:'info',
            title:'정보수정',
        },
        {
            id:'attend',
            title:'출석관리',
        },
        {
            id:'til',
            title:'My TIL',
        },
        {
            id:'shop',
            title:'My Shop',
        },
        {
            id:'admin',
            title:'관리자패널'
        }
    ]

    const [path, setPath] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const read_userRole = async() =>{
        try{
            const url = ''
            const response = await axios.get(url);
            if(response.status === 200){
                if (response.data.Role === 'ADMIN')
                    setIsAdmin(true);
                else setIsAdmin(false);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        const pathName = location.pathname.split('/');
        setPath(pathName[pathName.length-1]);
        console.log(pathName[pathName.length-1]);
        // read_userRole();
    }, [ location ])

    return(
        <div className="MyPageHeaderBox">
            {
                isAdmin ? 
                adminHeaders.map(menu =>
                    menu.id === path ? 
                    <Link to={`/mypage/${menu.id}`} key={menu.id} className="SelectedMenu">{menu?.title}</Link> :
                    <Link to={`/mypage/${menu.id}`} key={menu.id} className="Menu">{menu?.title}</Link>):
                headers.map(menu =>
                    menu.id === path ? 
                    <Link to={`/mypage/${menu.id}`} key={menu.id} className="SelectedMenu">{menu?.title}</Link> :
                    <Link to={`/mypage/${menu.id}`} key={menu.id} className="Menu">{menu?.title}</Link>
                )
            }
        </div>
    );
}

export default MypageHeader;