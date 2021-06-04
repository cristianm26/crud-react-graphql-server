import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './Schema'
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Users } from './Entities/User';


const main = async () => {
    await createConnection({
        type: "mysql",
        database: "GraphqlCRUD",
        username: "root",
        password: "WILDworld2020",
        logging: true,
        synchronize: false,
        entities: [
            Users
        ]

    })
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.listen(3001, () => {
        console.log('Servidor Corriendo en el puerto 3001')
    })
}


main().catch(err => {
    console.log(err)
})