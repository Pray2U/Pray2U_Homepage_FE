import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import '../../styles/SignUp/SignUpForm.scss';
import { getCookie, removeCookie, tokenDecode } from '../../util/auth';
import { uploadFile } from '../../util/s3Upload';


const SignUpForm = () =>{

    const navigate = useNavigate();

    const [ isValidName, setIsValidName ] = useState(false);
    const [ isValidPhoneNum, setIsValidPhoneNum ] = useState(false);
    const [ isValidEmail, setIsValidEmail ] = useState(false);
    const [ isValidAll, setIsValidAll ] = useState(true);
    
    const [ name, setName ] = useState(null);
    const [ phoneNum, setPhoneNum ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ profile, setProfile ] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isValidName && isValidPhoneNum && isValidEmail){
            setIsValidAll(true);
            post_signIn();
        }
        else{
            setIsValidAll(false);
            alert("빈칸이 존재합니다. 회원님의 정보를 입력해주세요.");
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
        // Unnecessary escape character: \. 경고를 비활성화하기 위해 아래 주석 코드 삽입
        // eslint-disable-next-line
        const emailPatter = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        setEmail(e.target.value);
        setIsValidEmail(emailPatter.test(e.target.value));
    };

    const handleInputProfile = (e) => {
        e.preventDefault();
        if(e.target.files){
            const file = e.target.files[0];
            setProfile(file);
        }
    };

    const post_signIn = async () =>{
        try{
            let token = tokenDecode(getCookie('accessToken'));
            let imgUrl = null;
            let res = null;
            if(profile){
                imgUrl = await uploadFile(profile);
            }else{
                res = await axios.get(`https://api.github.com/users/${token?.githubId}`);
            }
            const userInfo = {
                "username": name,
                "phoneNumber": phoneNum,
                "email": email,
                "profileImgUrl": imgUrl ? imgUrl : res.data.avatar_url,
            };
            const url = `${process.env.REACT_APP_API_SERVER}/api/auth/users/addinfo`;
            const response = await axios.post(url,userInfo,{
                headers:{ 
                    Authorization: `Bearer ${getCookie('accessToken')}`,
                },
                withCredentials:true
            });
            if(response.status === 200){
                console.log(response);
                removeCookie('accessToken');
                alert('회원 정보가 등록되었습니다.');
                navigate('/');
            }else{
                alert('데이터 형식이 올바르지 않습니다.');
            }
        }catch(e){
            alert(e.response.data.message);
            console.log(e.response);
        }
    }

    return (
        <Form className='Form' onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group className="Group" controlId="validationCustom01">
                    <Form.Label className='Label'>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</Form.Label>
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
                    <Form.Control
                        className='Control'
                        placeholder="Profile"
                        type='file'
                        onChange={handleInputProfile}
                    />
                </Form.Group>
            </Row>
            <Button className="Button" type="submit">회원가입</Button>
            <div className={isValidAll ? "ErrorMessageNone" : "ErrorMessage"}>
                ※ 입력이 잘못되었습니다. 다시 확인해주세요
            </div>
        </Form>
    );
}

export default SignUpForm;