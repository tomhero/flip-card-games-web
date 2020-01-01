/* eslint-disable no-console */
import axios from 'axios'

const host = process.env.VUE_APP_API_HOST || '35.227.148.145'
const port = process.env.VUE_APP_API_PORT
const apiKey = process.env.VUE_APP_API_KEY || 'be511834-5b8c-480f-98f0-8b741d3a4d65'
const apiVersion = process.env.VUE_APP_API_VERSION || 'v1'

const apiUrl = `http://${host}${port ? ':' + port : ''}/api/${apiVersion}/highscore/${apiKey}`

export function getGlobelHighestScore () {
  return axios.get(apiUrl)
}

export function sendPlayerHighScore (score) {
  return axios.post(apiUrl, { playerHighscore: score })
}