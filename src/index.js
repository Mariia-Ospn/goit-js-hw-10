import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { refs } from './js/refs';

function createCatList() {
  // Показываем лоадер перед началом запроса
  refs.loader.classList.remove('is-hidden');
  refs.selectCat.classList.add('is-hidden');
  refs.error.classList.add('is-hidden');

  //обрабатываем результат запроса на бэкенд (все породы кошек)
  fetchBreeds()
    .then(data => {
      const optionsList = data
        .map(({ id, name }) => ` <option value="${id}">${name}</option>`)
        .join(' ');

      refs.selectCat.innerHTML = optionsList;

      //стилизуем селект из дополнительной библиотеки SlimSelect

      new SlimSelect({
        select: refs.selectCat,
      });

      // Если получили данные успешно, прячем лоадер показываем селект

      refs.loader.classList.add('is-hidden');
      refs.selectCat.classList.remove('is-hidden');
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function onSelectChange(evt) {
  refs.loader.classList.remove('is-hidden');
  refs.selectCat.classList.add('is-hidden');

  const selectedBreedId = evt.currentTarget.value;

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      renderMarkupInfo(data);
      refs.loader.classList.add('is-hidden');
      refs.catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      refs.loader.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
}

function renderMarkupInfo(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];
  const beerdCard = `<img class="pfoto-cat" width = "300px" src="${url}" alt="${name}">
    <div class="text-part">
  <h2 class="name-cat">${name}</h2>
  <p class="deskr-cat">${description}</p>
  <p class="temperament-cat"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;

  refs.catInfo.innerHTML = beerdCard;
}

createCatList();
refs.selectCat.addEventListener('change', onSelectChange);
