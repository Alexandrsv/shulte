import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://shulte.zbc.su/api',
    // headers: {'API-KEY': 'be82d700-54e4-4201-a22e-d509e44f0f71',}
})


