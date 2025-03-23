const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    if (result) {
      console.log('connected to MongoDB')
    }
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validator = (number) => {
  const numberArray  = number.split('')
  if (numberArray[2] === '-') {
    return /\d{2}-\d{6,}/.test(number)
  } else if (numberArray[3] === '-') {
    return /\d{3}-\d{5,}/.test(number)
  }
  return false
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: validator,
      message: 'not a correct form. Try xx/xxx-xxx...'
    }
  },
},
)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v   }
})

module.exports = mongoose.model('Person', personSchema)