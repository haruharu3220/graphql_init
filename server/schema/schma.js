const graphql = require("graphql");
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
            resolve(parents,args){}
        }
    }
})