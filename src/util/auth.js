import { Cookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options}); 
}

export const getCookie = (name) => {
    return cookies.get(name); 
}

export const removeCookie = (name) => {
    cookies.remove(name, {path:"/"});
}

export const checkLogin = (name) => {
    let accessToken = cookies.get(name);
    if(accessToken){
        return true;
    }
    return false;
}

export const tokenDecode = (token) => {
    const payload = jwtDecode(token);
    return payload;
}

export const isCheckAdmin = () => {
    let token = getCookie('accessToken')
    if(token){
        const payload = jwtDecode(token);
        if(payload.role === 'ROLE_ADMIN'){
            return true;
        }
        return false;
    }
    return false;
}