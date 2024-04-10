import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../main'
import Register from '../views/register'
import Content from '../views/content'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/search' element={<Main />} />
                <Route path='/content/:id' element={<Content />} />
                <Route path='/views/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router