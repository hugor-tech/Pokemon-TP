import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'

function PokeDetails() {
  const { id } = useParams()
  const numericId = parseInt(id, 10)
  
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const MAX_POKEMON = 1025 // Limite max du Pokédex national

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    api.get(`/pokemon/${numericId}`)
      .then((res) => {
        setPokemon(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Pokémon introuvable")
        setLoading(false)
      })
  }, [numericId])

  if (loading) return <p>Chargement...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!pokemon) return null

  // Calcul des IDs avec les limites 1 et 1025
  const prevId = numericId > 1 ? numericId - 1 : null
  const nextId = numericId < MAX_POKEMON ? numericId + 1 : null

  return (
    <div>
      {/* Navigation Précédent / Suivant sécurisée */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        {prevId ? (
          <Link to={`/poke/${prevId}`}>◄ Précédent (# {prevId})</Link>
        ) : <span />}
        
        <Link to="/">Retour à l'accueil</Link>
        
        {nextId ? (
          <Link to={`/poke/${nextId}`}>Suivant (# {nextId}) ►</Link>
        ) : <span />}
      </div>

      <h1 style={{ textTransform: 'capitalize' }}>{pokemon.name} (# {pokemon.id})</h1>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} style={{ width: 150 }} />
      
      <p><strong>Poids :</strong> {pokemon.weight}</p>
      <p><strong>Taille :</strong> {pokemon.height}</p>
      <p><strong>Types :</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>

      {/* Affichage des Stats */}
      <h2>Statistiques</h2>
      <ul>
        {pokemon.stats.map((s) => (
          <li key={s.stat.name} style={{ textTransform: 'capitalize' }}>
            {s.stat.name} : <strong>{s.base_stat}</strong>
          </li>
        ))}
      </ul>

      {/* Affichage du Moveset */}
      <h2>Capacités (Moveset)</h2>
      <ul>
        {pokemon.moves.slice(0, 10).map((m) => (
          <li key={m.move.name} style={{ textTransform: 'capitalize' }}>
            {m.move.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokeDetails