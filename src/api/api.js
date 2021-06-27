import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://shulte.zbc.su/api/',
})


export const getScore = (userId) => {
    return instance.get(
        `api.php?userId=${userId}&${window.location.search.slice(1)}`,)
        .then(response => {
            return response.data
        })
}


