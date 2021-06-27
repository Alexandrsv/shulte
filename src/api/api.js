import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://shulte.zbc.su/api/',
    // headers: {'API-KEY': 'be82d700-54e4-4201-a22e-d509e44f0f71',}
})


export const getScore = (userId) => {
    return instance.get(
        `api.php?userId=${userId}`,)
        .then(response => {
            return response.data
        })
}


