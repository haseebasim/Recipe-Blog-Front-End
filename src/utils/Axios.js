import axios from 'axios'

export default axios.create({
  baseURL: "https://szfood-back-end.herokuapp.com",
  responseType: "json",
});