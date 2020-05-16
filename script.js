let form = document.getElementsByTagName('form')[0];
let radios = document.getElementsByClassName('radio');
let radioVal = '';

for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener('change', function (e) {
    e.preventDefault();
    if (this.value === 'random') {
      radioVal = 'random';
      document.getElementById('tab-wrapper').style.display = 'none';
      document.getElementById('text-area-wrapper').style.display = 'none';
    } else if (this.value === 'category') {
      category.render();
      document.getElementById('tab-wrapper').style.display = 'flex';
      document.getElementById('text-area-wrapper').style.display = 'none';
      radioVal = category.getCategoryName();
    } else if (this.value === 'search') {
      document.getElementById('tab-wrapper').style.display = 'none';
      document.getElementById('text-area-wrapper').style.display = 'block';
      search.renderSearch();
      document.getElementById('search-value').addEventListener('input', function (e) {
        radioVal = `search?query=${e.target.value}`;
      });
    }
  });
}

class Category {
  constructor(values) {
    this.values = values;
  }

  getCategoryName() {
    let categoryList = document.getElementById('tab-wrapper').getElementsByClassName('tab');
    for (let i = 0; i < categoryList.length; i++) {
      categoryList[i].addEventListener('click', (e) => {
        radioVal = e.target.getAttribute('data-val');
      });
    }
  }

  render() {
    let tabWrapper = document.getElementsByClassName('tab-wrapper')[0];
    if (tabWrapper.innerHTML === '') {
      for (let value in this.values) {
        let button = document.createElement('div');
        button.id = value;
        button.className = 'tab';
        button.innerHTML = value.toUpperCase();
        button.setAttribute('data-val', `random?category=${value}`);
        tabWrapper.appendChild(button);
      }
    }
  }
}

category = new Category({
  animal: 'animal',
  career: 'career',
  celebrity: 'celebrity',
  dev: 'dev',
});

class Search {
  constructor() {}

  renderSearch() {
    let searchWrapper = document.getElementById('text-area-wrapper');
    if (searchWrapper.innerHTML === '') {
      let input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Free text search');
      input.setAttribute('id', 'search-value');
      searchWrapper.appendChild(input);
    }
  }
}

let search = new Search();

function chuckNorris(radioVal) {
  return fetch(`https://api.chucknorris.io/jokes/${radioVal}`, {}).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Unable to fetch data');
    }
  });
}

class Joke {
  constructor({
    categories = 'undefined',
    created_at = 'undefined',
    icon_url = 'undefined',
    id = 'undefined',
    updated_at = 'undefined',
    url = 'undefined',
    value = 'undefined',
  }) {
    this.categories = categories.length === 0 ? 'random' : categories[0];
    this.created_at = created_at;
    this.icon_url = icon_url;
    this.id = id;
    this.updated_at = updated_at;
    this.url = url;
    this.value = value;
  }

  renderJoke() {
    console.log(this);
    let jokeContainer = document.createElement('div');
    jokeContainer.className = `joke ${this.id}`;
    jokeContainer.innerHTML = `
    <div class="joke__inner">
      <p class="joke__id"><span>ID:</span><a href="${this.url}">${this.id}</a></p>
      <p class="joke__text">
        ${this.value}
      </p>
      <div class="joke__footer">
        <span class="joke__last-update">Last update: ${this.updated_at}</span>
        <span class="joke__category">${this.categories}</span>
      </div>
    </div>
    <div class="joke__outer">
      <div class="joke__like ${this.id}"></div>
      <div class="joke__message"></div>
    </div>
    `;
    document.getElementById('jokes-wrapper').appendChild(jokeContainer);
  }
}

function listenLikes() {
  let generatedJokesLikeList = document.querySelectorAll('.joke__like');
  generatedJokesLikeList.forEach((like) => {
    console.log('like', like);
    like.addEventListener('click', function () {
      this.style.backgroundImage = "url('./heart.png')";
      console.log(document.querySelector(`.joke ${this.id}`));
    });
  });
}

// class Favourite {
//   constructor() {
//     this.favouriteJokes = [];
//   }

// }

// let joke = new Joke(radioVal);
// console.log(joke);

// document.querySelector('.joke__like').addEventListener('click', function () {
//   this.style.backgroundImage = "url('./heart.png')";
//   console.log(this);
//   // document.querySelector(`joke ${this.id}`);
// });
