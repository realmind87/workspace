import { useQuery } from "@tanstack/react-query";
import {getPosts} from 'api/posts'
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { GoCommentDiscussion } from "react-icons/go";
import { useSearchParams } from 'react-router-dom';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";
import config from '../../config'

dayjs.extend(relativeTime);
dayjs.locale(ko);

const Component = () => {
    const [query] = useSearchParams();
    const searchParams: any = query.get('q');
    const { data, isLoading } = useQuery({
        queryKey: ['posts', searchParams],
        queryFn: getPosts,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    })

    console.log(data)
    
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
                
                {data && data.length > 0 
                    ? (
                        data?.map((post, index) => {
                            return (
                                <div className="post__item" key={index}>
                                {post.Images.length > 0 &&
                                    <div className="post__thum">
                                        <Link to={`/content/${post.postId}`}>
                                            {
                                                post.Images[0].postType === 'uploads'
                                                    ? <img src={`${config}/${post.Images[0].link}`} width={80} height={80} alt='' />
                                                    : <img src={`${post.Images[0].link}`} width={80} height={80} alt='' />
                                            }
                                        </Link>
                                    </div>
                                }
                                <dl>
                                    <dt><Link to={`/content/${post.postId}`}>{post.title}</Link></dt>
                                    <dd>
                                        <ul className="d-list">
                                            <li>
                                                {
                                                    post.User.avatar.length > 0 ? (
                                                        <div className="user-img">
                                                            {
                                                                post.User.type === 'uploads' 
                                                                    ? <img src={`${config}/${post.User.avatar}`} width={16} height={16} alt='' />
                                                                    : <img src={`${post.User.avatar}`} width={16} height={16} alt='' />
                                                            }
                                                            
                                                        </div>
                                                    ) : (
                                                        <BsPersonCircle size={16} color="#dfdfdf" />
                                                    )
                                                }
                                                {post.User.username}
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
                    ) : <>
                        {searchParams 
                            ? (
                                <p className='txt-noSearch'>
                                    <strong className='txt-word'>{`"${searchParams}"`}</strong>
                                    에 관련된 검색결과가 없습니다.
                                    <Link to="/" type="button" className='btn-link'>다시 불러오기</Link>
                                </p>
                            ) : (
                                <p className='txt-noSearch'>
                                    리스트가 없습니다.
                                    <Link to="/" type="button" className='btn-link'>다시 불러오기</Link>
                                </p>
                            )
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Component