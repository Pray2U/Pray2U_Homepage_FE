// import axios from "axios";
// import { useState } from "react";
// import Form from 'react-bootstrap/Form';

// import '../../styles/Admin/UserRoleEditModal.scss';

// const UserRoleEditModal = ({closeModal}) =>{

//     const [selectedUser, setSelectedUser] = useState(null);
//     const [selectedRole, setSelectedRole] = useState(null);

//     const onChangeUserName = (e) =>{
//         setSelectedUser(e.target.value);
//         console.log(e.target.value);
//     };
    
//     const onChangeGithubId = (e) =>{
//         setSelectedRole(e.target.value);
//     };

//     const post_NewUserInfo = async() =>{
//         try{
//             const url = ``;
//             const data = {

//             }
//             const response = await axios.post(url,data);

//         }catch(e){

//         }
//     }

//     return(
//         <div className="UserRoleEditModalContainer">
//             <div className="UserEditModalBox">
//                 <div className="UserSelectBox">
//                     <div>유저 선택</div>
//                     <Form.Select
//                         onChange={onChangeUserName}>
//                         <option value={}>{}</option>
//                         <option value="2">최형순2</option>
//                         <option value="3">최형순1</option>
//                     </Form.Select>
//                 </div>
//                 <div className="RoleSelectBox">
//                     <div>직책 선택</div>
//                     <Form.Select>
//                         {/* <option>Open this select menu</option> */}
//                         <option value="1">관리자</option>
//                         <option value="2">멤버</option>
//                     </Form.Select>
//                 </div>
//                 <div className="UserRoleButtonBox">
//                     <div className="UserRoleCancelButton" onClick={()=>closeModal()}>취소</div>
//                     <div className="UserRoleSaveButton" onClick={()=>closeModal()}>저장</div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default UserRoleEditModal;