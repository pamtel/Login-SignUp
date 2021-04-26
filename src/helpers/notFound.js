import express from 'express'

const app = express.Router()

app.get('/', (req, res) => res.status(200).json({ message: 'Hi welcome to a working server' }))

app.all('*', (req, res) => res.status(400).json({ message: 'Ouch the routes does not exist!!!' }))

export default app