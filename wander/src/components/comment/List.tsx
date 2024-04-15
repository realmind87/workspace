import { BsPersonCircle } from "react-icons/bs";
import config from '../../config'
import { useApp } from "hooks/useApp";
import { CommentsProps } from '../../api/types'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale(ko);

const Component = ({comments}: any) => {

    const { userInfo } = useApp()

    console.log(comments)

    return (
        <div className="comment__list">
            <ul>
                {comments && comments.map((comment: any) => {
                    return (
                        <li key={comment.commentId}>
                            <div className="comment__user">
                                {comment.userInfo && comment.userInfo?.avatar.length > 0 
                                    ? <img 
                                        src={`${config}/${userInfo?.avatar}`} 
                                        width={32} 
                                        height={32}
                                        alt="프로필 이미지" 
                                    /> 
                                    : <BsPersonCircle size={32} color="#dfdfdf" />
                                }
                                <span className="comment__username">{ comment.userInfo.username }</span>
                                <span className="date">{dayjs(comment.createdAt).toNow(true)}</span>
                            </div>
                            <p>{comment.content}</p>
                        </li>
                    )
                })}

                {/* <li>
                    <div className="comment__user">
                        {userInfo && userInfo?.avatar.length > 0 
                            ? <img 
                                src={`${config}/${userInfo?.avatar}`} 
                                width={32} 
                                height={32}
                                alt="프로필 이미지" 
                            /> 
                            : <BsPersonCircle size={32} color="#dfdfdf" />
                        }
                        <span className="comment__username">usrename</span>
                        <span className="date">{dayjs(new Date()).toNow(true)}</span>
                    </div>
                    <p>comment 내용 comment 내용 comment 내용 comment 내용</p>
                </li>

                <li>
                    <div className="comment__user">
                        {userInfo && userInfo?.avatar.length > 0 
                            ? <img 
                                src={`${config}/${userInfo?.avatar}`} 
                                width={32} 
                                height={32}
                                alt="프로필 이미지" 
                            /> 
                            : <BsPersonCircle size={32} color="#dfdfdf" />
                        }
                        <span className="comment__username">usrename</span>
                        <span className="date">{dayjs(new Date()).toNow(true)}</span>
                    </div>
                    <p>comment 내용</p>
                </li> */}
            </ul>
        </div>
    )
}

export default Component;