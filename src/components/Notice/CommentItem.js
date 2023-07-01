import axios from "axios";
import { useState, useEffect } from "react";

import '../../styles/Notice/CommentItem.scss';

const CommentItem = ({userId, comment}) => {

    const [ userProfile, setUserProfile ] = useState(null);

    const read_userInfo = async() => {
        // try{
        //     const url = "";
        //     const response = await axios.get(url);
        //     setUserProfile(response.data.profileImgUrl);
        // }catch(e){
        //     console.log(e);
        // }
        setUserProfile('프로필');
    }

    useEffect(()=>{
        read_userInfo();
    },[]);

    return(
        <li className="CommentItemBox">
            <div className="UserProfile">
                {userProfile}
            </div>
            <div className="UserComment">
                {comment}
            </div>
        </li>
    );
}

export default CommentItem;