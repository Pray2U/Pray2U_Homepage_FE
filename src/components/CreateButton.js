import { Link } from 'react-router-dom';
import { BiSolidPencil } from "react-icons/bi";
import '../styles/Button/CreateButton.scss';

const CreateButton = ({link}) => {
    return(
        <div className="CreateBox">
            {
                link ? 
                <Link to={link} className="CreateForm">
                    <BiSolidPencil className="PencilLogo"/>
                    <p className="Write">작성하기</p>
                </Link>
                : <></>
            }
        </div>
    )
}

export default CreateButton;