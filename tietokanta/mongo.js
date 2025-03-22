const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

if (process.argv.length > 5 || process.argv.length === 4) {
    process.exit(1)
}

const name = process.argv[3]
const number = process.argv[4]

const url1 = `mongodb+srv://fullstack:${password}@cluster0.shsta.mongodb.net/`
const url2 = `?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(`${url1}${url2}`)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length === 3) {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
