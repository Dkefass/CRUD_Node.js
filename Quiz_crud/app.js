const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser=require("body-parser")
const Product=require("./models/product")

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


app.delete('/api/products/:id',(req,res,next)=>{
  Product.deleteOne({_id:req.params.id}).then(()=>res.status(200).json({message:"objet supprimé"}))
  .catch(error=>res.status(400).json({error}))
})
app.put('/api/products/:id',(req,res,next)=>{
  Product.updateOne({_id:req.params.id},{...req.body,_id:req.params.id})
  .then(()=>res.status(200).json({message:"objet modifié avec succès"}))
  .catch(error=>res.status(400).json({error}))
})
app.post('/api/products', (req, res, next) => {
    delete req.body._id
    const product= new Product({
        ...req.body
    })
    product.save()
    .then(Product=>res.status(201).json({ product: Product }))
    .catch(error=>res.status(201).json({error}))
  })

app.get('/api/products/:id',(req,res,next)=>{
    Product.findOne({_id:req.params.id}).then(Product=>res.status(200).json({product:Product}))
    .catch(error=>res.status(404).json({error}))
  })

app.get('/api/products',(req,res,next)=>{
    Product.find().then((Product)=>res.status(200).json({ products:Product  })).catch(error=>res.status(400).json({error}))
   
  })


module.exports = app;