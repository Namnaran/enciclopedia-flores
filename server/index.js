import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync } from 'node:fs'
import { flores } from './data/flores.js'

const app = express()
const PUERTO = process.env.PORT || 3001
const ARCHIVO_LIKES = new URL('./likes.json', import.meta.url)
const ARCHIVO_COMENTARIOS = new URL('./comentarios.json', import.meta.url)
const MAX_COMENTARIOS = 100

const leerLikes = () => JSON.parse(readFileSync(ARCHIVO_LIKES, 'utf-8'))
const leerComentarios = () => JSON.parse(readFileSync(ARCHIVO_COMENTARIOS, 'utf-8'))

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

app.get('/api/comentarios', (req, res) => {
  res.json(leerComentarios())
})

app.post('/api/comentarios', (req, res) => {
  const nombre = String(req.body?.nombre ?? '').trim()
  const mensaje = String(req.body?.mensaje ?? '').trim()

  if (nombre.length < 1 || nombre.length > 40) {
    return res.status(400).json({ error: 'El nombre debe tener entre 1 y 40 caracteres.' })
  }
  if (mensaje.length < 1 || mensaje.length > 300) {
    return res.status(400).json({ error: 'El mensaje debe tener entre 1 y 300 caracteres.' })
  }

  const comentario = { id: Date.now(), nombre, mensaje, fecha: new Date().toISOString() }
  const comentarios = [comentario, ...leerComentarios()].slice(0, MAX_COMENTARIOS)
  writeFileSync(ARCHIVO_COMENTARIOS, JSON.stringify(comentarios, null, 2))

  res.status(201).json(comentario)
})
app.listen(PUERTO, () => {
  console.log(`Servidor listo en http://localhost:${PUERTO}`)
})