import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { getUsers } from './Queries/User';
import { createUser, deleteUser, updatePassword } from './Mutations/User';
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getUsers
    }
})
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser,
        deleteUser,
        updatePassword
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})