import config from "config";
import {QueryFunction} from "@tanstack/query-core";
import { PostProps } from './types'

export const getPosts: QueryFunction<PostProps[], [_1: string, searchParams: string]> = async ({ queryKey }) => {
    const [_1, searchParams] = queryKey;

    try {
        const response = await fetch(`${config}/posts?q=${searchParams}`, {
            cache: 'no-store'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error)
    }
};

export const getAsidePosts = async () => {
    try {
        const res = await fetch(`${config}/posts/aside/list`, {
            cache: 'no-store',
            credentials: 'include'
        })
        
        if (!res.ok){
            throw new Error('Failed to fetch data')
        }
        
        return res.json();
        
    } catch (e) {
        console.error(e)
    }
}

export const getSinglePost = async ({ queryKey } : any) => {
    const [_1, id] = queryKey;
    
    try {
        const res = await fetch(`${config}/posts/content/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        
        return await res.json();

    } catch (e) {
        console.error(e);
        throw e; // Ensure you rethrow errors for react-query to handle them.
    }
}

export const createPost = async (formData: any) => {
    
    try {
        const response = await fetch(`${config}/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error)
    }
};

export const createComment = async (formData: any) => {

    //console.log(formData)
    
    try {
        const response = await fetch(`${config}/posts/comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
      
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error)
    }
};