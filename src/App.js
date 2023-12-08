import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import Notice from "./pages/Notice/Notice";
import NoticeCreate from "./pages/Notice/NoticeCreate";
import NoticeDetail from "./pages/Notice/NoticeDetail";
import NoticeEdit from "./pages/Notice/NoticeEdit";
import Til from "./pages/TIL/Til";
import TilCreate from "./pages/TIL/TilCreate";
import TilEdit from "./pages/TIL/TilEdit";
import Shop from "./pages/Shop/Shop";
import Event from "./pages/Event/Event";
import Error from "./pages/Error/Error";
import MyAttend from "./pages/Mypage/MyAttend";
import MyTil from "./pages/Mypage/MyTil";
import MyShop from "./pages/Mypage/MyShop";
import MyProfile from "./pages/Mypage/MyProfile";
import AdminUser from "./pages/Admin/AdminUser";
import AdminShop from "./pages/Admin/AdminShop";
import AdminOrder from "./pages/Admin/AdminOrder";
import AdminShopCreate from "./pages/Admin/AdminShopCreate";
import SignUp from "./pages/SignUp/SignUp";

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { checkLogin, isCheckGuest } from "./util/auth";
import Ranking from "./pages/Ranking/Ranking";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    let checkLogined = checkLogin("accessToken");
    setIsLoggedIn(checkLogined);
    if (checkLogined) {
      setIsGuest(isCheckGuest());
    }
  }, []);

  return (
    <>
      <Router>
        <Header />
        <div className="Container">
          {isLoggedIn ? (
            !isGuest ? (
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/notice/create" element={<NoticeCreate />} />
                <Route path="/notice/detail/:id" element={<NoticeDetail />} />
                <Route path="/notice/edit/:id" element={<NoticeEdit />} />
                <Route path="/event" element={<Event />} />
                <Route path="/til" element={<Til />} />
                <Route path="/til/create" element={<TilCreate />} />
                <Route path="/til/edit/:id" element={<TilEdit />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/mypage/profile" element={<MyProfile />} />
                <Route path="/mypage/attendance" element={<MyAttend />} />
                <Route path="/mypage/mytil" element={<MyTil />} />
                <Route path="/mypage/myshop" element={<MyShop />} />
                <Route path="/admin/user" element={<AdminUser />} />
                <Route path="/admin/shop" element={<AdminShop />} />
                <Route
                  path="/admin/shop/create"
                  element={<AdminShopCreate />}
                />
                <Route path="/admin/order" element={<AdminOrder />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/search" element={<Main />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="*" element={<Error />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Error />} />
              </Routes>
            )
          ) : (
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="*" element={<Error />} />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
