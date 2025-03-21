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


let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
    const amount = `Phonebook has info for ${persons.length} people`
    const time = Date()
    response.send(`${amount}<br/>${time}`)
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
    const a = persons.filter(p => body.name === p.name)
    if (a.length > 0) {
        return response.status(400).json({ 
            error: 'Name must be unique' 
        })
    }
  
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
  
    const person = {
      name: body.name,
      number: body.number || false,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})