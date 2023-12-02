import express from 'express'
import os from 'os'

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
    res.send(`Hiiiii from ${os.hostname}!`)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
