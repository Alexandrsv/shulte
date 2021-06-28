import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://shulte.zbc.su/api/',
})


export const getScore = (targetUserId) => {
    return instance.get(
        `get-score.php?userId=${targetUserId}&${window.location.search.slice(1)}`,)
        .then(response => {
            return response.data
        })
}


export const addScore = (size, time) => {
    return instance.post(
        `add-score.php?${window.location.search.slice(1)}`, {size, time})
        .then(response => {
            return response.data
        })
}


