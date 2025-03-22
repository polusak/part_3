import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const foundPerson = persons.filter(p => p.name === newName)
    if (foundPerson.length > 0) {
      const str1 = `${newName} is already added to phonebook.`
      const str2 = `Replace the old number with a new one?`
      if(window.confirm(`${str1} ${str2}`)
      ) {
        const modId = foundPerson[0].id
        personService
          .modify(modId, personObject)
          .then(modifiedPerson => {
            setError(false)
            setMessage(
              `Number of '${modifiedPerson.name}' was succesfully changed`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(
              persons.map(p => p.id !== modId ? p : modifiedPerson)
            )
            setFilteredPersons(
              filteredPersons.map(p => p.id !== modId ? p : modifiedPerson)
            )
          })
          .catch(error => {
            setError(true)
            setMessage(
              `'${personObject.name}' was already deleted from the server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            console.log(error)
            setPersons(
              persons.filter(p => p.id !== modId)
            )
            setFilteredPersons(
              filteredPersons.filter(p => p.id !== modId)
            )
          }

          )
      }
      setNewName('')
      setNewNumber('')
    } else {
      personService
        .create(personObject)
        .then(returnedPersons => {
          if (returnedPersons.error) {
            setMessage(
              returnedPersons.message
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          } else {
            setError(false)
            setMessage(
              `'${personObject.name}' was successfully added to the server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            const newList = persons.concat(returnedPersons.message)
            setPersons(newList)
            const upperCaseFilter = nameFilter.toUpperCase()
            const filteredPersonList = newList.filter(
              p => p.name.toUpperCase().includes(upperCaseFilter)
            )
            setFilteredPersons(filteredPersonList)
            setNewName('')
            setNewNumber('')
          }
        })
    }
  }

  const deleteId = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setError(false)
            setMessage(
              `'${deletedPerson.name}' was succesfully removed from the server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
          setFilteredPersons(
            filteredPersons.filter(p => p.id !== deletedPerson.id)
          )
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setNameFilter(newFilter)
    const up = newFilter.toUpperCase()
    const fp = persons.filter(p => p.name.toUpperCase().includes(up))
    setFilteredPersons(fp)
  }

  return (
    <div>
      <Notification error={error} message={message} />
      <h2>Phonebook</h2>
      <Filter 
        value={nameFilter}
        onChange={handleFilterChange}
      />

      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        nameInput={newName}
        nameChange={handleNameChange}
        numberInput={newNumber}
        numberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons
        idRemoval={deleteId}
        personList={filteredPersons}
      />
    </div>
  )

}

export default App
