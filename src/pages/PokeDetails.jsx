import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

function PokeDetails() {
  const { id } = useParams() // Récupère l'ID présent dans l'URL (:id)
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    api.get(`/pokemon/${id}`)
      .then((res) => {
        setPokemon(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Impossible de charger les détails de ce Pokémon.")
        setLoading(false)
      })
  }, [id]) // Se redéclenche automatiquement si l'ID dans l'URL change

  if (loading) return <p>Chargement des détails...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <div>
      <Link to="/">← Retour à l'accueil</Link>
      {pokemon && (
        <div>
          <h1>{pokemon.name.toUpperCase()} (#ID: {pokemon.id})</h1>
          <img 
            src={pokemon.sprites?.front_default} 
            alt={pokemon.name} 
            style={{ width: '150px', height: '150px' }}
          />
          <p>Taille : {pokemon.height}</p>
          <p>Poids : {pokemon.weight}</p>
          
          <h3>Types :</h3>
          <ul>
            {pokemon.types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PokeDetails