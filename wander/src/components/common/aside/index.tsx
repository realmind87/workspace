import RecentSearch from "./RecentSearch";

const Aside = () => {

    return (
        <aside>
            {/* {app.session?.user && <PostForm />} */}
            <RecentSearch />
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
          
        </aside>
    )
}

export default Aside