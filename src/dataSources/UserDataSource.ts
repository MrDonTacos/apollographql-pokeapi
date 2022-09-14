require('dotenv').config()
import { DataSource } from 'typeorm'
import { UserEntity } from '../entity/UserEntity';

const UserDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 25000,
    entities: [UserEntity]
});

export default UserDataSource;