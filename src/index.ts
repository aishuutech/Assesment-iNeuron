import {Express, NextFunction, Request, Response } from "express";
import axios, { AxiosResponse } from 'axios';
import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
const app = express();
require('dotenv').config();
const Model = require('./db');
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const mongoString = process.env.DATABASE_URL
console.log(mongoString);

mongoose.connect(String(mongoString));
const database = mongoose.connection

database.on('error',(error)=> {
    console.log(error);
})

database.once('connected',()=> {
    console.log('Database Connected');
})

app.use(express.json());
app.use('/users',router)

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.listen(3000, ()=> {
    console.log(`Server started at ${3000}`)
})

router.post('/addUser',addUser);
router.get('/getAll',getAll);
router.get('/:id',user);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);

app.get('/',(req,res)=> {
    res.send("Hello from express and typescript");
});

async function addUser(req:Request,res : Response, next : NextFunction) {
    console.log("Within AddUser",req.body);
    const data = new Model({
      name :  req.body.name,
      emailId :  req.body.emailId,
      dob : req.body.dob
    })
        const user = await data.save();
        res.status(200).json(user)
}

async function user(req:Request, res : Response, next : NextFunction) {
 let id = req.params.id;

 const user = await Model.findById(id);
 res.json(user)
}

async function deleteUser(req:Request, res : Response, next : NextFunction) {
    let id  = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`User ${id} has been deleted`)
}

async function getAll(req : Request,res: Response,next : NextFunction) {
    console.log("within getall api");
    const users = await Model.find();
    console.log(users);
    res.json(users);
}

async function updateUser(req:Request,res: Response,next: NextFunction) {
    let id = req.params.id;
    const user = await Model.findById(id);

    if(!user) throw 'User not found';

    const data = req.body;

    const updatedUser = await Model.findByIdAndUpdate(id, {
        name :  req.body.name,
        emailId :  req.body.emailId,
        dob : req.body.dob
      });
    res.json(updatedUser);
}