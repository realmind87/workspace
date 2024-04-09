import { useQuery } from "@tanstack/react-query";
import {PostProps} from './types'
import {getPosts} from 'api/posts'
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { GoCommentDiscussion } from "react-icons/go";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";

import config from '../../config'

dayjs.extend(relativeTime);
dayjs.locale(ko);

const Component = () => {

    const { data, isLoading } = useQuery<PostProps[]>({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    })
    
    return (
        <div className="post">
            <div className="post__content">
                {isLoading && (
                    <div className="post__item skeleton-loading">
                        <div className="post__thum"></div>
                        <dl>
                            <dt></dt>
                            <dd>
                                <ul className="d-list">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                )}
                
                {data && 
                    data?.map((post, index) => {
                        return (
                            <div className="post__item" key={index}>
                                <div className="post__thum">
                                    <Link to={`${post.User.userID}/status/${post.postId}`}>
                                        {
                                            post.Images[0].type === 'uploads'
                                                ? <img src={`${config}/${post.Images[0].link}`} width={80} height={80} alt='' />
                                                : <img src={`${post.Images[0].link}`} width={80} height={80} alt='' />
                                        }
                                    </Link>
                                </div>
                                <dl>
                                    <dt><Link to={`${post.User.userID}/status/${post.postId}`}>{post.title}</Link></dt>
                                    <dd>
                                        <ul className="d-list">
                                            <li>
                                                {
                                                    post.User.image ? (
                                                        <div className="user-img">
                                                            {
                                                                post.User.type === 'uploads' 
                                                                    ? <img src={`${config}/${post.User.image}`} width={16} height={16} alt='' />
                                                                    : <img src={`${post.User.image}`} width={16} height={16} alt='' />
                                                            }
                                                            
                                                        </div>
                                                    ) : (
                                                        <BsPersonCircle size={16} color="#dfdfdf" />
                                                    )
                                                }
                                                {post.User.userID}
                                            </li>
                                            <li>
                                                <GoCommentDiscussion size={12} />
                                                <span className="co-number">{post.Comments.length}</span>
                                            </li>
                                            <li>{dayjs(post.createdAt).toNow(true)}</li>
                                        </ul>
                                    </dd>
                                </dl>
                                {/* <button type="button" className="btn-like">
                                    <IoIosHeartEmpty size={18} color="#e2757a" />
                                    <span className="like-number">{post.Hearts.length}</span>
                                </button> */}
                            </div>
                        )    
                    })
                }
            </div>
        </div>
    )
}

export default Component