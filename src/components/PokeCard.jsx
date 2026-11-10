import { Link } from 'react-router-dom'

function PokeCard({ pokemon }) {
  // Extraire l'ID depuis l'URL de PokeAPI (ex: "https://pokeapi.co/api/v2/pokemon/1/" -> "1")
  const id = pokemon.url.split('/').filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return (
    <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8, textAlign: 'center' }}>
      <img src={imageUrl} alt={pokemon.name} style={{ width: 96, height: 96 }} />
      <h3 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h3>
      <Link to={`/poke/${id}`}>Voir détails</Link>
    </div>
  )
}

export default PokeCard