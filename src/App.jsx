import Home from './pages/Home'
import PokeDetails from './pages/PokeDetails'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <Link to="/">Accueil</Link>
        {/* Exemple d'un lien vers un Pokémon spécifique (ex: Bulbizarre ID 1) si tu veux un lien direct */}
        {/* <Link to="/poke/1">Détails Bulbizarre</Link> */}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poke/:id" element={<PokeDetails />} />
      </Routes>
    </>
  )
}

export default App