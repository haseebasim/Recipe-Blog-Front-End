import axios from 'axios'

export default axios.create({
  baseURL: "https://sz-food-backend.herokuapp.com",
  responseType: "json",
});
