import React from 'react'
import styles from './pokemonCard.module.css'

const PokemonCard = (props) => {
  const { pokemon } = props;

  return (
    <div className={`${styles.container}`}>
      <div>{pokemon.name}</div>
      <img className={styles.image} src={pokemon.image} alt="the pokemon"/>
    </div>
  )
}


export default PokemonCard
