import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import '../../styles/Header/MypageHeader.scss';
import axios from "axios";

const MypageHeader = ({onChangeMenu, selectedMenu}) =>{

    const userHeaders = [
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

    const [isAdmin, setIsAdmin] = useState(false);
    const [headerMenu, setHeaderMenu] = useState(userHeaders);

    const read_userRole = async() =>{
        try{
            const url = ''
            const response = await axios.get(url);
            if(response.status === 200){
                if (response.data.Role === 'ADMIN'){
                    setIsAdmin(true);
                    setHeaderMenu([...adminHeaders])
                }
                else{
                    setIsAdmin(false);
                    setHeaderMenu([...userHeaders])
                } 
            }
        }catch(e){
            console.log(e);
        }
    }

    const test_read_userRole = () => {
        if(true){
            setIsAdmin(true)
            setHeaderMenu([...adminHeaders])
        }
        else{
            setIsAdmin(false)
            setHeaderMenu([...userHeaders])
        }
    }

    useEffect(() => {
        // read_userRole();
        test_read_userRole();
    }, [])

    return(
        <div className="MyPageHeaderBox">
            {
                headerMenu.map((menu,idx) =>
                    menu.id !== 'admin' ?
                    <div key={menu.id} className={idx === selectedMenu ? "SelectedMenu" : "Menu"} onClick={()=>onChangeMenu(idx)}>{menu?.title}</div>
                    :
                    <Link to='/admin' className="Menu">{menu?.title}</Link>
                )
            }
        </div>
    );
}

export default MypageHeader;