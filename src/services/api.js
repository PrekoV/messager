import axios from 'axios'

const API = axios.create({
    baseURL: 'https://97373d4e.ngrok.io/api',
    // onUploadProgress: function (progressEvent) {
    //     if (progressEvent.lengthComputable) {
    //         console.log(progressEvent.loaded + ' ' + progressEvent.total);
    //         //this.updateProgressBarValue(progressEvent);
    //     }
    // },
})

API.interceptors.request.use(function (config) {
    config.headers.common['authorization'] = localStorage.getItem('token')
    config.headers.common['Content-Type'] = "application/json"
    return config
}, function (error) {
    return Promise.reject(error)
})

API.interceptors.response.use(function (response) {
    if (response.data.token) {
        console.log(response.data.token)
        localStorage.setItem('token', `Bearer ${response.data.token}`)
        console.log( localStorage.getItem('token'))
    }
    return response
}, function (error) {
    return Promise.reject(error)
})

export default API