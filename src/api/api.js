import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://shulte.zbc.su/api/',
    // baseURL: 'http://localhost:3000/api/',
})


export const getInit = (userInfo) => {
    const name = userInfo.first_name + ' ' + userInfo.last_name
    const sex = userInfo.sex
    return instance.get(
        `user-init?sex=${sex}&name=${name}&${window.location.search.slice(1)}`,)
        .then(response => {
            return response.data
        })
}

export const getScore = (targetUserId) => {
    return instance.get(
        `get-score?userId=${targetUserId}&${window.location.search.slice(1)}`,)
        .then(response => {
            return response.data
        })
}


export const addScore = (score) => {
    return instance.post(
        `add-score?${window.location.search.slice(1)}`, {...score})
        .then(response => {
            return response.data
        })
}


