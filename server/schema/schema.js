
const graphql = require("graphql");
const Movie = require('../models/Movie');
const Director = require('../models/Director');

const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt,GraphQLSchema} = graphql

const MovieType = new GraphQLObjectType({
    name: "Movie",
    //取得したいデータを記載
    fields:() =>   ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})


const DirectorType = new GraphQLObjectType({
    name: "Director",
    //取得したいデータを記載
    fields:() =>   ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
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
        },
        director:{
            type:DirectorType,
            args:{id:{type:GraphQLString}},
            resolve(parents,args){
                return Director.findById(args.id)
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
        },
        addDirector:{
            type:DirectorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let director = new Director({
                    name: args.name,
                    age: args.age
                })
                return director.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})