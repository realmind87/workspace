import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../main'
import Register from '../views/register'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/views/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router