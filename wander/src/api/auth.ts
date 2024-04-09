import config from "config";
import type { Credentials, UserInfo } from "./types";
import Cookies from 'js-cookie';


export const register = async (userInfo: UserInfo) => {

    try {
      console.log(config)
      console.log(userInfo)

      const response = await fetch(`${config}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      throw error;
    }

};

export const login = async (credentials: Credentials) => {

    const response = await fetch(`${config}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();

    console.log(data)

    if (data.token) {
      // 로그인 성공 시, 사용자 정보를 쿠키에 저장
      Cookies.set('user', data.user.username, { expires: 7 }); // 쿠키 유효기간 7일로 설정
      Cookies.set('token', data.token, { expires: 7 }); // 쿠키 유효기간 7일로 설정
    }
    
    return data;
};

export const logOut = async (credentials: Credentials) => {

  const response = await fetch(`${config}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  Cookies.remove('user')
  Cookies.remove('token')

};


export const logout = () => {
  sessionStorage.removeItem('token');
};
