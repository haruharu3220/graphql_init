const { GraphQLSchema } = require("graphql");
const graphql = require("graphql");
const Movie = require('../models/Movie');
const {GraphQLObjectType,GraphQLID,GraphQLString} = graphql

const MovieType = new GraphQLObjectType({
    name: "Movie",
    //取得したいデータを記載
    fields:() =>   ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLString}},
            resolve(parents,args){
                return Movie.findById(args.id)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addMovie:{
            type:MovieType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString}
            },
            resolve(parent,args){
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre
                })
                return movie.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})