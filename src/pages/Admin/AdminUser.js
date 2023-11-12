import { useEffect, useState } from "react";
import { isCheckAdmin } from "../../util/auth";
import { useNavigate } from "react-router-dom";

import AdminApprovalList from "../../components/Admin/AdminApprovalList";
import AdminSideMenu from "../../components/Admin/AdminSideMenu";
import AdminUserList from "../../components/Admin/AdminUserList";
import Title from "../../components/Title/Title";
import Footer from "../../components/Footer";

// import ApprovalModal from "../components/Modal/ApprovalModal";

import "../../styles/Admin/AdminUser.scss";
const AdminUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = isCheckAdmin();
    if (!isAdmin) {
      navigate("/error");
    }
  }, []);

  return (
    <>
      <div className="w-[1280px] h-auto m-auto mb-[2rem]">
        <Title title={"유저 관리"} />
        <div className="flex w-full pt-[3rem]">
          <AdminSideMenu />
          <div className="w-[80%]">
            <AdminUserList />
            <AdminApprovalList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminUser;
