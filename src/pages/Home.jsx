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

  return (
    <div>
      <h1>Pokédex</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && pokemons.length === 0 && <p>Aucun Pokémon trouvé.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15 }}>
        {pokemons.map((pokemon) => (
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