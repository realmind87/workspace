import { useParams } from 'react-router-dom';
import { useApp } from "../../../hooks/useApp";
import RecentSearch from "./RecentSearch";
import RecentPosts from './RecentPosts';

const Aside = () => {

    const {userInfo} = useApp();
    const params = useParams();
    const { id } = params;

    if (id) {
        return (
            <aside>
                <RecentPosts />
            </aside>
        )
    }
    
    return (
        <aside>
            {/* {userInfo && <PostForm />} */}
            <RecentSearch />
            {userInfo && (
                <dl className="follow-terms">
                    <dt>팔로우 목록</dt>
                    <dd>
                        <p className='txt-nodata'>팔로우 목록이 없습니다.</p>
                        {/* <ul className="terms-list">
                            <li>
                            <button type="button" className="btn-del">
                                <BsPersonCircle size={32} color="#dfdfdf" />
                            </button>
                            <Link href="" className="follow-link">
                                김아무개111111
                            </Link>
                            </li>
                            <li>
                            <button type="button" className="btn-del">
                                <BsPersonCircle size={32} color="#dfdfdf" />
                            </button>
                            <Link href="" className="follow-link">
                                김아무개22222
                            </Link>
                            </li>
                        </ul> */}
                    </dd>
                </dl>
            )}
            
        </aside>
    )
}

export default Aside