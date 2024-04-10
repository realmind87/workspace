import Aside from '../../components/common/aside';
import Header from '../../components/common/Header';
import { getSinglePost } from '../../api/posts'
import { useQuery } from '@tanstack/react-query';
import { BsPersonCircle } from 'react-icons/bs';
import config from '../../config';
import { useParams } from 'react-router-dom';

const Component = () => {
    const params = useParams();
    const {id} = params

    console.log(id)
    
    const { data, isLoading } = useQuery({
        queryKey: ['content', id],
        queryFn: getSinglePost,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    })

    return (
        <div className="wrap">
            <Header />
            <main className="container">
                <section className="content">
                    <article className="detail">
                        <div className="detail__userInfo">
                            <div className='detail__profile'>
                                {isLoading ? (
                                    <>
                                        <div className='btn-user skeleton-loading'></div>
                                        <p className='skeleton-loading'></p>
                                    </>
                                ) : (
                                    <>
                                        <button type="button" className='btn-user'>
                                            {data?.User.image?.length !== 0 
                                                ? <>
                                                    {   
                                                        data?.User.type === 'uploads'
                                                            ? <img src={`${config}/${data?.User.image}`} width={32} height={32} alt="프로필 이미지" />
                                                            : <img src={`${data?.User.image}`} width={32} height={32} alt="프로필 이미지" />
                                                        
                                                    }
                                                </> 
                                                : <BsPersonCircle size={32} color="#dfdfdf" />
                                            }
                                        </button>
                                        <p>{data?.User.userID}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <header className="detail__header">
                            {isLoading ? <h1 className='skeleton-loading'></h1> : <h1>{data?.title}</h1>}
                        </header>
                        <article className="detail__content">
                            {isLoading ? <>
                                <p className='skeleton-loading'></p>
                                <p className='skeleton-loading'></p>
                                <p className='skeleton-loading'></p>
                            </> : <p>{data?.content}</p>}
                        </article>
                    </article>
                </section>
                <Aside />
            </main>
        </div>
        
    )
}

export default Component