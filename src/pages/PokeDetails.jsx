import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

function PokeDetails() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
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
        setError("Pokémon introuvable")
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!pokemon) return null

  return (
    <div>
      <Link to="/">◄ Retour à l'accueil</Link>
      <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h1>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} style={{ width: 150 }} />
      <p><strong>Poids :</strong> {pokemon.weight}</p>
      <p><strong>Taille :</strong> {pokemon.height}</p>
      <p><strong>Types :</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
    </div>
  )
}

export default PokeDetails