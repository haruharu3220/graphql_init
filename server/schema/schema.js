
const graphql = require("graphql");
const Movie = require('../models/Movie');
const Director = require('../models/Director');

const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList,GraphQLNonNull} = graphql

const MovieType = new GraphQLObjectType({
    name: "Movie",
    //取得したいデータを記載
    fields:() =>   ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        director:{
            type:DirectorType,
            resolve(parent, args){
                return Director.findById(parent.directorId);
            }
        }
    })
})


const DirectorType = new GraphQLObjectType({
    name: "Director",
    //取得したいデータを記載
    fields:() =>   ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        movies:{
            type:new GraphQLList(MovieType),
            resolve(parent,args){
                return Movie.find({directorId:parent.id})
            }
        }
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
        },
        movies:{
            type:new GraphQLList(MovieType),
            resolve(parent,args){
                return Movie.find({})
            }
        },
        directors:{
            type: new GraphQLList(DirectorType),
            resolve(parent,args){
                return Director.find({})
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
                genre:{type:GraphQLString},
                directorId:{type:GraphQLID}
            },
            resolve(parent,args){
                let movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId:args.directorId
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
        },
        updateMovie:{
            type: MovieType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID) },
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                directorId:{type:GraphQLInt}

            },
            resolve(parent,args){
                let updateMovie = {}
                args.name && (updateMovie.name = args.name)
                args.age && (updateMovie.genre = args.genre)
                args.directorID && (updateMovie.directorId = args.directorId)
                return Movie.findByIdAndUpdate(args.id,updateMovie,{new:true})
            }
        },
        updateDirector:{
            type:DirectorType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID) },
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let updateDirector = {}
                args.name && (updateDirector.name = args.name)
                args.age && (updateDirector.age = args.age)
                return Director.findByIdAndUpdate(args.id,updateDirector,{new:true})

            }
        },
        deleteMovie:{
            type:MovieType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                return Movie.findByIdAndRemove(args.id)
            }
        },
        deleteDirector:{
            type:DirectorType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                return Director.findByIdAndRemove(args.id)
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})