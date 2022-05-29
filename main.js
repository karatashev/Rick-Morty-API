const cardsContainer = document.querySelector('.container')
const searchInput = document.querySelector('.search');
const toggleSwitch = document.querySelector('.toggle-switch');

let numOfAvatars = [...Array(100).keys()]

// Toggle switch listener
toggleSwitch.addEventListener('click', () => {
  document.body.classList.toggle('white');
})


async function getCharacters() {
  try {
    const url = `https://rickandmortyapi.com/api/character/${numOfAvatars}`
    let res = await fetch(url);
    return await res.json()
  } catch (err) {
    console.log(err)
  }
};

async function showCharacters() {
  let characters = await getCharacters()
  console.log(characters)
  let cards = ""

  characters.forEach((chara) => {
    let characterCard = `
    <div class="card-container">
    <h4 class="name">${chara.name}</h4>
    <div class="card">
        <img class="image" src="${chara.image}" alt="">
        <p class="species">Species: ${chara.species}</p>
      </div>
      </div> `
      

    cards += characterCard
  })
  cardsContainer.innerHTML = cards
}

showCharacters()


searchInput.addEventListener('keyup', getAndFilterCharactersNames)

async function showFilteredCards(array) {
  let characters = await getCharacters()
  array.forEach((card) => {
    cardsContainer.innerHTML += `
    <div class="card-container">
    <h4 class="name">${card.name}</h4>
    <div class="card">
        <img class="image" src="${card.image}" alt="">
        <p class="species">Species: ${card.species}</p>
      </div>
      </div> `;
  });
}

async function getAndFilterCharactersNames() {
  let charactersNames = await getCharacters()
  console.log(charactersNames)
  const filteredNames = charactersNames
  .filter(charName => searchInput.value.toLowerCase() === 
  charName.name.toLowerCase().substring(0, searchInput.value.length)
  );
  console.log(filteredNames)
  cardsContainer.innerHTML = ""
  showFilteredCards(filteredNames);
}



