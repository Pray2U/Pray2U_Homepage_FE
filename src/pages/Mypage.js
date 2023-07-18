
import MyInfo from "../components/Mypage/MyInfo";
import Template from "../components/Template";

import '../styles/MyPage/Mypage.scss';

const Mypage = () =>{
    return(
        <>
            <Template>
                <div className="MyPageTitleBox">
                    <div className="MyPageTitle">My Page</div>
                    <div className="MyPageSubTitle">Pray2U Member</div>
                </div>
                <MyInfo/>
            </Template>
        </>
    );
}

export default Mypage;