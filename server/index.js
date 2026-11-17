import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync } from 'node:fs'
import { flores } from './data/flores.js'

const app = express()
const PUERTO = process.env.PORT || 3001
const ARCHIVO_LIKES = new URL('./likes.json', import.meta.url)

const leerLikes = () => JSON.parse(readFileSync(ARCHIVO_LIKES, 'utf-8'))

app.use(cors())
app.use(express.json())

app.get('/api/flores', (req, res) => {
  res.json(flores)
})

app.get('/api/likes', (req, res) => {
  res.json(leerLikes())
})

app.post('/api/flores/:id/like', (req, res) => {
  const { id } = req.params

  if (!flores.some((flor) => flor.id === id)) {
    return res.status(404).json({ error: 'Flor no encontrada' })
  }

  const likes = leerLikes()
  likes[id] = (likes[id] || 0) + 1
  writeFileSync(ARCHIVO_LIKES, JSON.stringify(likes, null, 2))

  res.json({ id, likes: likes[id] })
})

app.listen(PUERTO, () => {
  console.log(`Servidor listo en http://localhost:${PUERTO}`)
})