import dotenv from 'dotenv'
dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 3000

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}

const PAGINATION = {
  page: 1,
  limit: 2
}

const config = {
  server: SERVER,
  pagintion: PAGINATION
}

export default config
