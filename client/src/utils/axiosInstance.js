import axios from "axios"

const instance = axios.create({
  baseURL: "https://nvcticlubinventory.onrender.com/api/"
})

export default instance;
