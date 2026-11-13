import { useState, useEffect } from 'react'
import api from '../services/api'
import PokeCard from '../components/PokeCard'
import Pagination from '../components/Pagination'

const LIMIT = 6

function Home() {
  const [allPokemons, setAllPokemons] = useState([]) // Liste complète légère (nom + url)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // 1. Charger tous les noms de Pokémon une seule fois au montage
  useEffect(() => {
    setLoading(true)
    setError(null)

    api.get('/pokemon?limit=10000&offset=0')
      .then((res) => {
        setAllPokemons(res.data.results)
        setLoading(false)
      })
      .catch(() => {
        setError("Erreur lors du chargement des Pokémon")
        setLoading(false)
      })
  }, [])

  // 2. Filtrer sur l'ensemble des Pokémon
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  )

  // 3. Calculer la pagination sur la liste filtrée
  const totalPages = Math.ceil(filteredPokemons.length / LIMIT)
  const hasNext = page < totalPages
  const startIndex = (page - 1) * LIMIT
  const paginatedPokemons = filteredPokemons.slice(startIndex, startIndex + LIMIT)

  // Réinitialiser à la page 1 dès que l'utilisateur modifie sa recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
  }

  const handlePrev = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNext = () => {
    if (hasNext) setPage(page + 1)
  }

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          list="pokemon-suggestions"
          placeholder="Rechercher un Pokémon..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            width: '100%',
            maxWidth: '300px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        {/* Suggestions natives du navigateur basées sur les lettres tapées */}
        {searchTerm.trim().length > 0 && (
          <datalist id="pokemon-suggestions">
            {filteredPokemons.slice(0, 10).map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name} />
            ))}
          </datalist>
        )}
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && paginatedPokemons.length === 0 && (
        <p>Aucun Pokémon trouvé pour « {searchTerm} ».</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15 }}>
        {paginatedPokemons.map((pokemon) => (
          <PokeCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      {filteredPokemons.length > 0 && (
        <Pagination
          page={page}
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={page === 1}
          disableNext={!hasNext}
        />
      )}
    </div>
  )
}

export default Home