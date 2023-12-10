import express from 'express'
import {v4 as uuidv4} from 'uuid'

const router = express.Router();
let users = []

router.get("/", (req, res) => {
    
    res.send(users)
})
router.post("/", (req, res) => {
    const user = req.body;
    
    users.push({...user, id:uuidv4()})
    res.send(`user with name ${user.fname} has been added`)
})
router.get("/:id", (req, res) => {
    const foundUser = users.find((user) => user.id === req.params.id)
    res.send(foundUser)
})
router.delete("/:id", (req, res) => {
    users = users.filter((user) => user.id != req.params.id)
    res.send(`user with id ${req.params.id} has been deleted`)
})
router.patch("/:id", (req, res) => {
    const {fname, lname, age} = req.body;
    const userUp = users.find((user) => user.id === req.params.id)
    if(fname){
        userUp.fname = fname
    }
    if(lname){
        userUp.lname = lname
    }
    if(age){
        userUp.age = age
    }
    res.send(`user with id ${req.params.id} has been updated`)
})
    




export default router;