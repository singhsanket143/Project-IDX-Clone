import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CreateProject } from './pages/CreateProject'

function App() {


  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
    </Routes>
  )
  
}

export default App
