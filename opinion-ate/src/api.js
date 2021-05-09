import axios from 'axios';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/r9NhvoT5T0I4Zn3V74AKgtk3q5CLkI06',
});

const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(response => response.data);
  },
  createRestaurant(name) {
    return client.post('/restaurants', {name}).then(response => response.data);
  },
};

export default api;
