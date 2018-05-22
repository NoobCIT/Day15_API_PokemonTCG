/*=== API REQUESTS ===*/

let url1 = 'https://api.pokemontcg.io/v1/cards/base6-3';
let url2 = 'https://api.pokemontcg.io/v1/cards/base1-2';
let url3 = 'https://api.pokemontcg.io/v1/cards/base1-15';
let urls = [url1, url2, url3];

var options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

let fetchCalls = urls.map(url => {
  return fetch(url, options);
});

getPromiseData(fetchCalls)
  .then(pokemonData => displayCards(pokemonData));

function displayCards(pokemonData) {
  let div = document.createElement('DIV');
  div.classList.add('container');
  for (let item of pokemonData) {
    let { imageUrlHiRes } = item.card;
    div.appendChild(createTypElement(imageUrlHiRes));
  }
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(div);
}

function createTypElement(imageFile) {
  let div = document.createElement('DIV');
  div.classList.add('card');
  let img = document.createElement('IMG');
  img.src = imageFile;
  div.appendChild(img);
  return div;
}

function getPromiseData(promiseArray) {
  return new Promise((resolve, reject) => {
    Promise.all(promiseArray)
      .then(responses => {
        return responses.map(response => response.json());
      })
      .then(promises => {
        Promise.all(promises)
          .then(resolve);
      })
      .catch(reject);
  })
}
