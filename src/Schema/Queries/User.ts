import { GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { Users } from '../../Entities/User';
export const getUsers = {
    type: new GraphQLList(UserType),
    resolve() {
        return Users.find();
    },
}