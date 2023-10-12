# Pokemon

### Starter Pokemon:

```json
{ 
      name: "Bulbasaur", 
      image: "https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/500px-0001Bulbasaur.png", 
      elementType: "grass", 
      description: "Seed Pokemon" 
    },{ 
      name: "Squirtle", 
      image: "https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/500px-0007Squirtle.png",
      elementType: "water", 
      description: "Tiny Turtle Pokemon"
    },{
      name: "Charmander",
      image: "https://archives.bulbagarden.net/media/upload/thumb/2/27/0004Charmander.png/500px-0004Charmander.png",
      elementType: "fire",
      description: "Lizard Pokemon"
    }
  ```

### Additional Pokemon Properties:

```html
  <div className={styles.name}>{pokemon.name}</div>
```

### Pokemon Card Padding:

```css
  margin: 25px;
  padding: 25px;
```

### Conditional Styling: 

```html
<div className={`${styles.container} ${colorForType(pokemon.elementType)}`}>
```

and

```js
const colorForType = (elementType) => {
  if(elementType === 'fire'){
    return styles.fireType
  }

  if(elementType === 'water'){
    return styles.waterType
  }

  if(elementType === 'grass'){
    return styles.grassType
  }
}
```
