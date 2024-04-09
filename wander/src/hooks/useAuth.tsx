import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie'

interface Auth {
    session: any;
}

const cookies = new Cookies()
  
export const useAuth = (): Auth => {
    const [session, setSession] = useState<any>({session: null})

    useEffect(() => {
        const session = JSON.stringify(cookies.get('connect.sid'))

        console.log(session)

        if (session){
            setSession({ session })
        }

    }, []);
    
    return { session };
};