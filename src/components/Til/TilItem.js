import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";

import '../../styles/Til/TilItem.scss';


const TilItem = () =>{

     // 테스트 더미
    const dummyMyInfo = {
        userId : 1,
        githubId: "gildong Hong",
        username: "gildong",
        profileImgUrl: "/profile/HeaderProfile.png",
        phoneNumber: "010-0000-0001",
        Email: "gildong@gmail.com",
        Role: "USER",
        createDate: "2023-06-31",
        modifiedDate: "2023-07-01"
    };


    const onDeleteTIL = (id) => {
        alert(id);
    }

    return(
        <div className="TilItemBox">
            <div className="TilHeaderBox">
                <img src={dummyMyInfo.profileImgUrl} alt="프로필" className='Profile'/>
                <p className="TilDetailTile">2023-06-12 TIL</p>
                <div className="EditButton">
                    <AiTwotoneEdit/>
                </div>
                <div className="DeleteButton" onClick={()=>onDeleteTIL(1)}>
                    <AiFillDelete/>
                </div>
            </div>
            <div className="TilContentBox">
                내용
            </div>
            <div className="TilMoreSeeBox">
                더 보기
            </div>
        </div>
    );
}

export default TilItem;