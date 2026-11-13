import Home from './pages/Home'
import PokeDetails from './pages/PokeDetails'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <nav style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        {/* Exemple d'un lien direct vers un Pokémon spécifique (ex: Bulbizarre ID 1) */}
        <Link to="/poke/1">Exemple Pokemon #1</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/poke/:id" element={<PokeDetails/>}/>
      </Routes>
    </>
  )
}

export default App