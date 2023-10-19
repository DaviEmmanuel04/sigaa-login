const express = require('express')
const cors = require('cors')
const loginRouter = require('./router/loginRouter')

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta 3003`)
})

app.use('/', loginRouter)

