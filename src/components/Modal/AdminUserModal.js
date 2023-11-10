import "../../styles/Modal/AdminUserModal.scss";

const AdminUserModal = ({onToggle}) => {
    return(
        <div className='AdminUserModalBox'>
            <div className='AdminUserModalEditButton' onClick={onToggle}>직책 수정</div>
            {/* <div className='AdminUserModalDeleteButton'>회원 삭제</div> */}
        </div>
    );
}

export default AdminUserModal;