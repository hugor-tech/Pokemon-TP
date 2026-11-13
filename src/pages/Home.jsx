import { useState, useEffect } from 'react'
import api from '../services/api'
import PokeCard from '../components/PokeCard'
import Pagination from '../components/Pagination'

const LIMIT = 6

function Home() {
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasNext, setHasNext] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setLoading(true)
    setError(null)
    const offset = (page - 1) * LIMIT

    api.get(`/pokemon?offset=${offset}&limit=${LIMIT}`)
      .then((res) => {
        setPokemons(res.data.results)
        setHasNext(res.data.next !== null)
        setLoading(false)
      })
      .catch(() => {
        setError("Erreur lors du chargement des Pokémon")
        setLoading(false)
      })
  }, [page])

  const handlePrev = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNext = () => {
    if (hasNext) setPage(page + 1)
  }

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            width: '100%',
            maxWidth: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* CORRECTION ICI : on vérifie filteredPokemons au lieu de pokemons */}
      {!loading && !error && filteredPokemons.length === 0 && <p>Aucun Pokémon trouvé.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15 }}>
        {/* CORRECTION ICI : on mappe sur filteredPokemons */}
        {filteredPokemons.map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <Pagination
        page={page}
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={page === 1}
        disableNext={!hasNext}
      />
    </div>
  )
}

export default Home