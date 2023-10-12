import React from 'react'
import styles from './pokemonCard.module.css'

const colorForType = (elementType) => {
  if(elementType === 'fire') return styles.fireType

  if(elementType === 'water') return styles.waterType

  if(elementType === 'grass') return styles.grassType
}

const PokemonCard = (props) => {
  const { pokemon } = props;

  return (
    <div className={`${styles.container} ${colorForType(pokemon.elementType)}`}>
      <div className={styles.name}>{pokemon.name}</div>
      <img className={styles.image} src={pokemon.image} alt="the pokemon"/>
    </div>
  )
}


export default PokemonCard
