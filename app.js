import express from 'express'
import * as db from './util/database.js'
import cors from "cors";

const PORT = 8080;
const app = express()
app.use(cors())
app.use(express.json())

app.get("/szamla",(req,res) =>{
    try {
        const szamla = db.getAllszamla();
    res.status(200).json(szamlas)
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.post("/szamla",(req,res) =>{
try {
    const {kiallito, vevo, szSzama, szKelte} = req.body
    if (!kiallito || !vevo || !szSzama|| !szKelte){
        return res.status(400).json({message: "Data missing"})
    }
    const savedszamla = db.createszamla(kiallito, vevo, szSzama, szKelte)
    if (savedszamla.changes != 1){
        return res.status(422).json({message: "Failed to upload"})
    }
    res.status(201).json({id: savedszamla.lastInsertRowid ,kiallito, vevo, szSzama})
} catch (error) {
    res.status(500).json({message: "Error: "+error})
}
})

app.put("/szamla/:id",(req,res) =>{
    try {
        const {kiallito, vevo, szSzama, szKelte} = req.body
        if (!kiallito || !vevo || !szSzama|| !szKelte){
           return res.status(400).json({message: "Data missing"})
        }
        const savedszamla = db.setszamla(req.params.id,kiallito, vevo, szSzama, szKelte)
        if (savedszamla.changes != 1){
            return res.status(422).json({message: "Failed to upload"})
        }
        res.status(200).json({id: savedszamla.lastInsertRowid ,kiallito, vevo, szSzama, szKelte})
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.delete("/szamla/:id",(req,res) =>{
    try {
        const deleteszamla  = db.deleteszamla(req.params.id)
        if (deleteszamla.changes != 1){
            return res.status(422).json({message: "Failed to upload"})
        }
        res.status(200).json({ message: "Delete successful" });
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.listen(PORT, ()=> console.log("Runs at "+PORT))