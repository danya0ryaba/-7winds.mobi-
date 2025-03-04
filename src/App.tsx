import { Route, Routes } from 'react-router-dom'

import './styles/global.scss'
import { Home } from './pages/Home/Home'
import { Error } from './pages/Error/Error'
import { MainLayout } from './layout/MainLayout'

function App() {

  return (
    <>
      {/* <main className='container'> */}
      <Routes>
        <Route path='/' element={<MainLayout />}>

          <Route path='' element={<Home />} />
          <Route path='*' element={<Error />} />

        </Route>
      </Routes>
      {/* </main> */}
    </>
  )
}

export default App
