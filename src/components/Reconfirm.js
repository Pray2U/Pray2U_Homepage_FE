
import '../styles/Modal/Reconfirm.scss';

const Reconfirm = ({message, cancleButton, OkButton, onCancel, onCheck}) => {
    
    return(
        <div className="ReconfirmContainer">
            <div className="ReconfirmModal">
                <p className="ReconfirmMessage">{message}</p>
                <div className="ReconfirmButtons">
                    <div className="CancelButton" onClick={()=>onCancel()}>{cancleButton}</div>
                    <div className="ConfirmButton" onClick={()=>onCheck()}>{OkButton}</div>
                </div>
            </div>
        </div>
    )
}

export default Reconfirm;