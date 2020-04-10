const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give at least one argument: password')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url =
  `mongodb+srv://tsaarika:${password}@phonebook-fxjvs.mongodb.net/phonebook?retryWrites=true&w=majority`
  
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)
  
if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 4) {
  console.log('Pease give full contact info - name and number')
  process.exit(1)
}
else {
  const person = new Person({
    name: newName,
    number: newNumber
  })
  
  person.save().then(response => {
    console.log(`Added ${newName} ${newNumber} to the phonebook`)
    mongoose.connection.close()
  })
  
}