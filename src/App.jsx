import Home from './pages/Home'
import PokeDetails from './pages/PokeDetails'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <nav style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/poke/:id">pokemon ID</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/poke/:id" element={<PokeDetails/>}/>
      </Routes>
    </>
  )
}

export default App