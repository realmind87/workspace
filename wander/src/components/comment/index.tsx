import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import Button from '../buttons'
import List from "./List";
import { useApp } from "hooks/useApp";
import { useMutations } from "hooks/useMutations";

const Component = ({post}: any) => {
    
    const mutation = useMutations();
    const { setLoginModal, userInfo } = useApp();
    const [content, setContent] = useState<string>('');
    const [textHeight, textSetHeight] = useState('50px'); // 초기 높이 설정

    const comments = post?.Comments

    const onLogin = () => {
        setLoginModal?.(true)
    }

    const handleContentChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const _value = event.target.value;
        // 글자수에 따라 높이 조정
        const numberOfLineBreaks = (_value.match(/\n/g) || []).length;
        // 기본 높이 + (한 줄의 높이 * 줄 수)
        const newHeight = 40 + numberOfLineBreaks * 20;
        textSetHeight(`${newHeight}px`);
        setContent(_value);
    };

    const onComment : FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutation.commentMutations.mutate({postId: post.postId, userInfo, content})
    }

    useEffect(() => {
        console.log(post)
    }, [post])

    return (
        <div className="comment__warp">
            <div className="comment__edit">
                <form onSubmit={onComment}>
                    <textarea 
                        className="comment__text" 
                        placeholder="내용을 입력해 주세요" 
                        value={content} 
                        onChange={handleContentChange}
                        style={{ height: textHeight }}
                    />
                    <div className="comment__btnarea">
                        {userInfo 
                            ? (
                                <Button
                                    type="submit"
                                    className='btn'
                                    text="등록"
                                />
                            ) : (
                                <Button
                                    type="button"
                                    className='btn'
                                    text="로그인 후 등록 가능"
                                    onHandler={onLogin}
                                />
                            )
                        }
                    </div>
                </form>
            </div>
            
           {comments && <List comments={comments} /> }
        </div>
    )
}

export default Component;