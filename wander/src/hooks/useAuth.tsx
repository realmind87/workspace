import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface Auth {
    session: any;
}
  
export const useAuth = (): Auth => {
    const [session, setSession] = useState<any>({user: null, token: null})
    
    useEffect(() => {
        const user = Cookies.get('user');
        const token = Cookies.get('token');
        if (token){
            setSession({ ...session, user, token })
        }

    }, []);
    
    return { session };
};