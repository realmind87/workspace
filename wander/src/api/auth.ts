import config from "config";
import type { Credentials, UserInfo } from "./types";
//import Cookies from 'js-cookie';
import { Cookies } from 'react-cookie'
import cookie from 'cookie'

const cookies = new Cookies();

export const register = async (userInfo: UserInfo) => {

    try {
      const response = await fetch(`${config}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw error
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
      const error = await response.json();
      throw error
    }
  
    const data = await response.json();

    return data;
};

export const logOut = async (session : any) => {
  console.log(session)
  const response = await fetch(`${config}/users/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(session)
  });

  if (!response.ok) {
    throw new Error('LogOut failed');
  }
};
