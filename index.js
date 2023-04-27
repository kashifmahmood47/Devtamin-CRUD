const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')
const port = 3000
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// Connect to MongoDB Atlas

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send("Homepage")
})

app.get('/blog', (req, res) => {
  res.send("Blogpage")
})

//upload a product
app.post('/products', async (req, res) => {
  // console.log(req.body)
  // res.send(req.body)
  try {
    const product = await Product.create(req.body)
    
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message })
  }

})

//get all products
app.get('/products', async (req, res) => {

  try {

    const products = await Product.find({})
    res.status(200).json(products)

  } catch (error) {
    console.log(error)
  }


})

//get product from id 
app.get('/products/:id', async (req, res) => {

  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)

  } catch (error) {
    console.log(error)
  }
})

//update a product from id
app.put('/products/:id', async (req, res) => {

  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)

    if (!product)
      return res.status(404).json({ message: `Id: {id} cannot be found` })

    const updatedProduct = await Product.findById(id)
    res.status(200).json(updatedProduct)




  } catch (error) {
    console.log(error)
  }
})

// delete a product

app.delete('/products/:id' , async (req,res)=>{
try {
  const {id} = req.params
  const product = await Product.findByIdAndDelete(id)
  
if(!product)
return res.status(404).json({message: `id ${id} not found`})

res.status(200).json(({message: `id ${id} deleted`}))


} catch (error) {
  console.log(error)
}
})
mongoose.set("strictQuery", false)
mongoose.connect(`mongodb+srv://ikashifmahmood:pk111666@cluster0.rknfgtg.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas:', error);
  });