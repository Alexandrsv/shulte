import axios from 'axios'

export const instance = axios.create({
    // baseURL: 'https://shulte.zbc.su/api/',
    baseURL: 'http://localhost:3000/api/',
})


export const getInit = (userInfo) => {
    // console.log(userInfo)
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


