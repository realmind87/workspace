import { ChangeEventHandler, FormEvent, FormEventHandler, MutableRefObject, useEffect, useRef, useState } from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PostProps} from '../../api/types'
import { useMutations } from '../../hooks/useMutations'
import Modal from "../modal";
import { RiEditLine, RiImageAddLine } from "react-icons/ri";
import config from "../../config";
import { useApp } from "../../hooks/useApp"
import Editor from '../editor'

const PostForm = () => {
    const {postModal, setPostModal} = useApp();
    const mutation = useMutations();
    const { userInfo, setToast } = useApp()
    const editorRef : MutableRefObject<any> = useRef(null);
    const [title, setTitle] = useState<string>("")
    //const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const onPost = () => {
        setPostModal?.(true)
    }

    const [resData, setResData] = useState({
        code: "",
        message: "",
    })

    const onSubmit : FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        
        const content = editorRef.current?.getInstance().getMarkdown();

        if (title.length === 0) {
            setResData({code: "NOT_TITLE", message: '제목을 입력해 주세요'})
            return;
        }
        
        if (!content) {
            setResData({code: "NOT_CONTENT", message: '내용을 입력해 주세요'})
            return 
        }

        mutation.postMutations.mutate({userInfo, title, content})
    }
    
    return (
        <div className="edit-wrap">
            <button type="button" className="btn-post" onClick={onPost}>
                <RiEditLine size={16} />
                게시글 작성
            </button>
            
            <Modal mode="full" isOpen={postModal} onClose={() => setPostModal?.(false)}>
                <form onSubmit={onSubmit}>
                    <div className="post-form">
                        <dl>
                            <dt>제목</dt>
                            <dd>
                                <input 
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={`${resData.code === "NOT_TITLE" ? 'wran' : ''}`}
                                    placeholder='제목을 입력해 주세요'
                                />
                                {resData.code === "NOT_TITLE" && <p className="txt-warn">{resData.message}</p>}
                            </dd>
                        </dl>
                        <dl>
                            <dt>내용</dt>
                            <dd>
                                <Editor ref={editorRef} />
                                {resData.code === "NOT_CONTENT" && <p className="txt-warn">{resData.message}</p>}
                            </dd>
                        </dl>
                        
                        <div className='btn-area'>
                            <button type="submit" className='btn-submit'>등록하기</button>
                        </div>
                    </div>
                    
                </form>
            </Modal>
        </div>
    )
}

export default PostForm