import "../../styles/Modal/AdminItemModal.scss";

const AdminItemModal = ({onToggle, onRemove}) => {
    return(
        <div className='AdminItemModalBox'>
            <div className='AdminItemModalEditButton' onClick={onToggle}>수정하기</div>
            <div className='AdminItemModalDeleteButton' onClick={onRemove}>삭제하기</div>
        </div>
    );
}

export default AdminItemModal;