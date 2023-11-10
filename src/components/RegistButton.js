import '../styles/Button/RegistButton.scss';

const RegistButton = ({onHandleCancel, onHandleSave}) =>{
    return(
        <div className="RegistButtons">
            <div className="RegistCancel" onClick={()=>onHandleCancel()}>취소</div>
            <div className="RegistSave"  onClick={()=>onHandleSave()}>등록</div>
        </div>
    )
}

export default RegistButton;