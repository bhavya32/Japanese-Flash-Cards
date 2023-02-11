import express from "express"
const app = express()

app.use(express.static("html"))

app.get("/getQuestion", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify({
        "question":"享",
        "answer":"idk",
        "choices":["idk","idk1","idk2","idk3"]
    }))
})

app.listen(9234)