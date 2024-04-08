"use client"

import { useEffect, useState} from 'react'
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

const RecentSearch = () => {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const handleDelete = (searchToDelete: string): void => {
        const updatedSearches = recentSearches.filter(search => search !== searchToDelete);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    useEffect(() => {
        // 페이지 로드 시 localStorage에서 최근 검색어 목록을 불러옵니다.
        const searches: string[] = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        setRecentSearches(searches);
    }, [])

    return (
        <dl className="search-terms">
            <dt>최근 검색어</dt>
            <dd>
                {recentSearches.length === 0 ? (
                    <p className='txt-nodata'>최근 검색이 없습니다.</p>
                ) : (
                    <ul className="terms-list">
                        {recentSearches.map((search, index) => (
                            <li key={index}>
                                <Link to={`/search?q=${search}`} className="search-link">
                                    {search}
                                </Link>
                                <button type="button" className="btn-del" onClick={() => handleDelete(search)}>
                                    <IoIosClose size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                
                
              {/* <ul className="terms-list">
                <li>
                  <Link href="" className="search-link">
                    검색 1
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 2
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 3
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 4
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
                <li>
                  <Link href="" className="search-link">
                    검색 5
                  </Link>
                  <button type="button" className="btn-del">
                    <IoIosClose size={18} />
                  </button>
                </li>
              </ul> */}
            </dd>
        </dl>
    )
}

export default RecentSearch