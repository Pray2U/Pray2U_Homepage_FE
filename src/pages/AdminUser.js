import { useEffect, useState } from "react";
import { isCheckAdmin } from "../util/auth";
import { useNavigate } from "react-router-dom";

import AdminApprovalList from "../components/Admin/AdminApprovalList";
import AdminSideMenu from "../components/Admin/AdminSideMenu";
import AdminUserList from "../components/Admin/AdminUserList";
import Title from "../components/Title/Title";
import Footer from "../components/Footer";

// import ApprovalModal from "../components/Modal/ApprovalModal";

import '../styles/Admin/AdminUser.scss';
const AdminUser = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        const isAdmin = isCheckAdmin();
        if(!isAdmin){
            navigate('/error');
        }
    },[]);

    return(
        <>
            <div className="AdminUserContainer">
                <Title title={"유저 관리"}/>
                <div className="AdminUserListBox">
                    <AdminSideMenu/>
                    <div className="AdminUserList">
                        <AdminUserList/>
                        <AdminApprovalList/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
};


export default AdminUser;