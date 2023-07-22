const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require("body-parser")
const Thing=require("./models/thing")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
mongoose.connect('mongodb+srv://test_node:test_node@cluster0.lxagwwy.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use(bodyParser.json())


app.post('/api/stuff', (req, res, next) => {
    delete req.body._id
    const thing= new Thing({
        ...req.body
    })
    thing.save()
    .then(()=>res.status(201).json({message:"objet créé"}))
    .catch(error=>res.status(201).json({error}))
  })

app.get('/api/stuff/:id',(req,res,next)=>{
    Thing.findOne({_id:req.params.id}).then(thing=>res.status(200).json(thing))
    .catch(error=>res.status(404).json({error}))
  })

app.get('/api/stuff',(req,res,next)=>{
    Thing.find().then(things=>res.status(200).json(things)).catch(error=>res.status(400).json({error}))
   
  })


module.exports = app;