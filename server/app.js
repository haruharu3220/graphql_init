const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const { mongoose }= require('mongoose');
const schema = require("./schema/schema");
const app = express();

//mongoDBの接続
mongoose.connect("mongodb+srv://admin:Admin12345@cluster0.aejcr4p.mongodb.net/")
mongoose.connection.once('open',()=>{
    console.log("db connected");
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

app.listen(4000,() => {
    console.log("listening on")
})

