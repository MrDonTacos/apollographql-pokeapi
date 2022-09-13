import { DataSource } from 'typeorm'
import { User } from '../entity/User';

const UserDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "mrdontacos",
    password: "",
    database: "poke_g_api",
    connectTimeout: 25000,
    entities: [User]
});

export default UserDataSource;