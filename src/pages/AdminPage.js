import { useState } from "react";
import Template from "../components/Template"
import UsedItemList from "../components/Admin/UsedItemList";
import UserCreate from "../components/Admin/UserCreate";

import '../styles/Admin/AdminPage.scss';

const AdminPage = () =>{
    
    const AdminMenu = [
        {
            id: 0,
            title: "아이템 사용관리"
        },
        {
            id: 1,
            title: "멤버 관리"
        },
        {
            id: 2,
            title: "멤버 생성"
        }
    ]
    const AdminComponent = [
        {
            id: 0,
            contents:<UsedItemList/>
        },
        {
            id:2,
            contents:<UserCreate/>
        }
    ]
    const [isAdmin, setIsAdmin] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState(0);

    const onChangeMenu = (id) => {
        setSelectedMenu(id);
    }

    if(!isAdmin){

    }

    return(
        <>
            <Template>
                <div className="MyPageTitleBox">
                    <div className="MyPageTitle">Admin Page</div>
                    <div className="MyPageSubTitle">Pray2U Member</div>
                </div>
                <div className="AdminPageContainer">
                        <div className="AdminMenuBox">
                            {
                                AdminMenu.map(menu => 
                                    <div 
                                        className={menu.id === selectedMenu ?"SelectedAdminMenu" : "AdminMenu"}
                                        onClick={()=>onChangeMenu(menu.id)}
                                        key={menu.id}>
                                        {menu.title}
                                    </div>
                                )
                            }
                        </div>
                        {
                            AdminComponent?.map((component) =>
                                component.id === selectedMenu && component.contents
                            )
                        }
                    </div>
            </Template>
        </>
    );
}

export default AdminPage;