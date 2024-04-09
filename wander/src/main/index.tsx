import Search from "../components/search"
import Aside from "../components/common/aside"
import Header from "../components/common/Header"
import Posts from '../components/posts/list'


const Componet = () => {
    
    return (
        <div id="wrap">
            <Header />
            <main className="container">
                <section className="content">
                    <div className="post__wrap">
                        <div className="post__header">
                            <h2 className="tit">최근 게시글</h2>
                            <Search />
                        </div>
                        <Posts />
                    </div>
                </section>
                <Aside />
            </main>
        </div>
    )
}

export default Componet