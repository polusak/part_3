require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token(
    'response-body', 
    (req, res) => {return JSON.stringify(req.body)}
)
app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :response-body'
));

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/info', (request, response) => {
  Person.find({}).then(people => {
    const amount = `Phonebook has info for ${people.length} people`
    const time = Date()
    response.send(`${amount}<br/>${time}`)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    persons = persons.filter(p => p.id !== id)
    response.json(person)
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === `` || body.name === undefined) {
      return response.status(400).json({ 
          error: 'Name missing' 
      })
  }

  if (body.number === `` || body.number === undefined) {
      return response.status(400).json({ 
        error: 'Number missing' 
      })
  }

    const person = new Person({
      name: body.name,
      number: body.number,
      id: body.id
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})