import { useState, useEffect } from "react";

import '../../styles/Header/MypageHeader.scss';
import axios from "axios";

const MypageHeader = ({onChangeMenu, selectedMenu}) =>{

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

    const [isAdmin, setIsAdmin] = useState(true);

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
        // read_userRole();
    }, [])

    return(
        <div className="MyPageHeaderBox">
            {
                isAdmin ? 
                adminHeaders.map((menu,idx) => 
                    idx === selectedMenu ? 
                    <div key={menu.id} className="SelectedMenu" onClick={()=>onChangeMenu(idx)}>{menu?.title}</div> :
                    <div key={menu.id} className="Menu" onClick={()=>onChangeMenu(idx)}>{menu?.title}</div>):
                headers.map((menu,idx) =>
                    idx === selectedMenu ? 
                    <div key={menu.id} className="SelectedMenu" onClick={()=>onChangeMenu(idx)}>{menu?.title}</div> :
                    <div key={menu.id} className="Menu" onClick={()=>onChangeMenu(idx)}>{menu?.title}</div>
                )
            }
        </div>
    );
}

export default MypageHeader;