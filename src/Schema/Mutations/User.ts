import { UserType } from '../TypeDefs/User';
import { GraphQLString, GraphQLID } from 'graphql';
import { Users } from '../../Entities/User';
import { MessagesType } from '../TypeDefs/Messages';

export const createUser = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: any) {
        const { name, username, password } = args;
        await Users.insert({
            name, username, password
        })
        return args
    }
}

export const updatePassword = {
    type: MessagesType,
    args: {
        username: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const { username, oldPassword, newPassword } = args;
        const user = await Users.findOne({ username });
        if (!user) {
            throw new Error("Username no existe");
        }
        const userPassword = user?.password;

        if (oldPassword === userPassword) {
            await Users.update({ username }, { password: newPassword });
            return { successful: true, message: "Actualizado Correctamente" }
        } else {
            throw new Error("PASSWORDS DO NOT MATCH!");
        }
    },
};

export const deleteUser = {
    type: MessagesType,
    args: {
        id: { type: GraphQLID },

    },
    async resolve(parent: any, args: any) {
        const id = args;
        await Users.delete(id);
        return { successful: true, message: "Eliminado Correctamente" }
    }
}