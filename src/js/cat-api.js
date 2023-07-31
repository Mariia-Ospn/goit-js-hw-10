import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] =
  'live_56ixb2oNAp24dYnn50l5L99fGWscDPLIKHgSmKgI6UfKdYTvLwwrW3Nj8XYR7SEY';

function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    // возвращаем данные из response.data( Axios автоматически распознает JSON-данные)
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      // возвращаем данные из response.data( Axios автоматически распознает JSON-данные)
      return response.data;
    });
}

export { fetchBreeds, fetchCatByBreed };
