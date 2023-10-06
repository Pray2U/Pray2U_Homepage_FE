import { useState, useEffect, useRef } from "react";
import { Editor } from '@toast-ui/react-editor';

import Header from "../components/Header/Header";

import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';

import '../styles/Til/Til.scss';
import '../styles/Til/TilCreate.scss';

import axios from "axios";

const CreateTil = () => {

    const editorRef = useRef();

    const [ isLoggedIn, setIsLoggedIn ] = useState(true);
    const [ tilContent, setTilContent ] = useState(null);

    const onChangeContents = () =>{
        setTilContent(editorRef.current?.getInstance().getMarkdown());
        console.log(tilContent);
    }

    const onPostTilData = async() => {
        // try{
        //     const url = 'api';
        //     const data = {

        //     };
        //     const response = await axios.post(url,data);
        //     if (response == 200){
        //         //모달창
        //     }
        //     //모달창
        // }catch(e){
        //     console.log(e);
        //     //모달창
        // }
        console.log(tilContent);
    }

    return(
        <div className="TilContainer">
            <Header isLoggedIn={isLoggedIn}/>
            <div className="TilTitleBox">
                <div className="Title">TIL</div>
                <div className="SubTitle">Today I Learned</div>
                <div className="TilSaveButton" onClick={()=>onPostTilData()}>저장</div>
            </div>
            <div className="TilSaveBox">
            </div>
            <div className="TilEditBox">
                <Editor
                    ref={editorRef} // DOM 선택용 useRef
                    previewStyle="vertical"
                    height="100%"
                    background-color="white"
                    initialEditType="markdown"
                    initialValue={tilContent || ""}
                    hideModeSwitch="true"
                    useCommandShortcut={true}
                    language="ko-KR"
                    onChange={onChangeContents}
                />
            </div>
        </div>
    );
}

export default CreateTil;