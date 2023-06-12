import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import '../../styles/SignIn/SignInForm.scss';


const SignInForm = () =>{

    const navigate = useNavigate();

    const [ isValidName, setIsValidName ] = useState(false);
    const [ isValidPhoneNum, setIsValidPhoneNum ] = useState(false);
    const [ isValidEmail, setIsValidEmail ] = useState(false);
    const [ isValidProfile, setIsValidProfile ] = useState(false);
    const [ isValidAll, setIsValidAll ] = useState(true);
    
    const [ name, setName ] = useState(null);
    const [ phoneNum, setPhoneNum ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    const handleSubmit = (event) => {
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }
        event.preventDefault();
        if(isValidName && isValidPhoneNum && isValidEmail && isValidProfile){
            console.log("complete");
            setIsValidAll(true);
            // 데이터 POST
            // signIn();
        }
        else{
            setIsValidAll(false);
            console.log('error');
        }
        
        
    };

    const handleInputName = (e) => {
        const namePatter = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}$/;
        setName(e.target.value);
        setIsValidName(namePatter.test(e.target.value));
    };

    const handleInputPhoneNum = (e) => {
        const phoneNumPatter = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        setPhoneNum(e.target.value);
        setIsValidPhoneNum(phoneNumPatter.test(e.target.value));
    };

    const handleInputEmail = (e) => {
        const emailPatter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        setEmail(e.target.value);
        setIsValidEmail(emailPatter.test(e.target.value));
    };

    const handleInputProfile = (e) => {
        setProfile(e.target.files[0]);
        console.log(e.target.files[0]);
        if(e.target.files[0]){
            setIsValidProfile(true);
        }
        else{
            setIsValidProfile(false);
        }
    };

    const signIn = async () =>{
        try{
            const userInfo = {
                name: name,
                phonenumber: phoneNum,
                email: email,
                profileImgUrl: profile,
            };
            const url = '/api/users/infoform';
            const response = await axios.post(url,userInfo,{withCredentials:true});
            if(response){
                navigate('/');
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <Form className='Form' onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group className="Group" controlId="validationCustom01">
                    <Form.Label className='Label'>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</Form.Label>
                    <p className='Star'>*</p>
                    <Form.Control
                        className='Control'
                        required
                        type="text"
                        placeholder="Name"
                        isInvalid={!isValidName}
                        isValid={isValidName}
                        onChange={handleInputName}
                    />
                </Form.Group>
                <Form.Group className="Group" controlId="validationCustom02">
                    <Form.Label className='Label'>전화번호</Form.Label>
                    <p className='Star'>*</p>
                    <Form.Control
                        className='Control'
                        required
                        type="text"
                        placeholder="Phone Number ('-' 기입)"
                        isInvalid={!isValidPhoneNum}
                        isValid={isValidPhoneNum}
                        onChange={handleInputPhoneNum}
                    />
                </Form.Group>
                <Form.Group className="Group" controlId="validationCustomUsername">
                    <Form.Label className='Label'>이 메 일</Form.Label>
                    <p className='Star'>*</p>
                    <Form.Control
                        className='Control'
                        required
                        type="text"
                        placeholder="Email ('@' 기입)"
                        isInvalid={!isValidEmail}
                        isValid={isValidEmail}
                        onChange={handleInputEmail}
                    />
                </Form.Group>
                <Form.Group className="Group" controlId="validationCustomUsername">
                    <Form.Label className='Label'>프 로 필</Form.Label>
                    <p className='Star'>*</p>
                    <Form.Control
                        className='Control'
                        required
                        placeholder="Profile"
                        type='file'
                        // value={profile?.name || ''}
                        isInvalid={!isValidProfile}
                        isValid={isValidProfile}
                        onChange={handleInputProfile}
                    />
                    {/* <label className='Upload' htmlFor='input-file'>
                        <img className='UploadImg'src='./upload.png' alt='img'/>
                    </label>
                    <input 
                        type="file" 
                        id="input-file" 
                        style={{display:"none"}}
                        onChange={handleInputProfile}
                    /> */}
                </Form.Group>
            </Row>
            <Button className="Button" type="submit">회원가입</Button>
            <div className={isValidAll ? "ErrorMessageNone" : "ErrorMessage"}>
                ※ 입력이 잘못되었습니다. 다시 확인해주세요
            </div>
        </Form>
    );
}

export default SignInForm;