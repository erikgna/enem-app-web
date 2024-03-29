import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'

import { QuestionContextCmpnt } from './context/Question'
import { History } from './pages/history/History'

import { Home } from './pages/home/Home'
import { Auth } from './pages/auth/Auth'
import { NotFound } from './pages/notFound/NotFound'
import { Question } from './pages/question/Question'

function App() {
  return (
    <BrowserRouter>
      <QuestionContextCmpnt>
        <Navbar />
        <section>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/question/random/:random/:id' element={<Question />} />
            <Route path='/history' element={document.cookie.includes('unsolved-token') ? <History /> : <Home />} />
            <Route path='/login' element={<Auth />} />
            <Route path='/register' element={<Auth />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </section>
      </QuestionContextCmpnt>
    </BrowserRouter>
  )
}

export default App
