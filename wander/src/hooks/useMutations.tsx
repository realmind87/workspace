import { login, logOut, register } from '../api/auth'
import { createPost, createComment } from '../api/posts'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApp } from './useApp'
import { Link, useNavigate } from 'react-router-dom';
import { PostProps } from 'api/types';

export const useMutations = () => {
    const app = useApp();
    const queryClient = useQueryClient()
    const navigation = useNavigate()

    // 로그인
    const loginMutations = useMutation({
        mutationFn: login,
        onError: (error, variables) => {
            app.setToast({ state: 'error', msg: error.message })
        },
        onSuccess: (data, variables) => {
            app.setCookie('auth', data.token, { path: '/' });
            app.setCookie('user', data.uesr, { path: '/' });
            app.setToast({ state: 'success', msg: '로그인 되었습니다.' })
        },
        onSettled: (data, error, variables) => {},
    })

    // 로그아웃
    const logoutMutation = useMutation({
        mutationFn: logOut,
        onError: (error, variables) => {},
        onSuccess: (data, variables) => {
            app.removeCookie('auth', { path: '/' });
            app.removeCookie('user', { path: '/' });
            app.setToast({ state: 'success', msg: '로그아웃 되었습니다.' })
        },
        onSettled: (data, error, variables) => {},
    })

    // 회원가입
    const registerMutations = useMutation({
        mutationFn: register,
        onError: (error, variables) => {
            app.setToast({ state: 'error', msg: error.message })
        },
        onSuccess: (data, variables : FormData) => {
            const username = variables.get('username') as string
            const password = variables.get('password') as string
            
            loginMutations.mutate({username, password})
            
            navigation("/")
        },
        onSettled: async (data, error, variables) => {
            
        },
    })

    const postMutations = useMutation({
        mutationFn: createPost,
        onError: (error, variables) => {
            app.setToast({ state: 'error', msg: error.message })
        },
        onSuccess: async (data, variables) => {
            if (queryClient.getQueryData(['posts'])) {
                queryClient.setQueryData(['posts'], (old : PostProps[]) => [...old, data])
            }
            queryClient.invalidateQueries({queryKey: ['posts']});
            app.setPostModal?.(false)
            app.setToast({ state: 'success', msg: '등록되었습니다.' })
        },
        onSettled: async (data, error, variables) => {
            
        },
    })

    const commentMutations = useMutation({
        mutationFn: createComment,
        onError: (error, variables) => {
            app.setToast({ state: 'error', msg: error.message })
        },
        onSuccess: async (data, variables) => {
            //console.log(data)
            if (queryClient.getQueryData(['posts'])) {
                queryClient.setQueryData(['posts'], (old : PostProps[]) => [...old, ...data])
            }
            queryClient.invalidateQueries({queryKey: ['content']});
            app.setToast({ state: 'success', msg: '등록되었습니다.' })
        },
        onSettled: async (data, error, variables) => {
            
        },
    })

    return { registerMutations, loginMutations, logoutMutation, postMutations, commentMutations };
};