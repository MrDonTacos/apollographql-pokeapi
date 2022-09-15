import { Arg, Args, Authorized, ID, Mutation, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { UserInDto } from "../classes/dto/UserInDto";
import { User } from "../classes/User";
import UserDataSource from "../dataSources/UserDataSource";
import { UserEntity } from "../entity/UserEntity";
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcryptjs')

@Resolver(of => User)
export class UserResolver {
    @Authorized()
    @Query(() => User, {description: "Query to fetch current user data, you need to be the user who is consulting the data to use this query"})
    async user(@Arg("username") username: string, @Arg("password") password: string) {
        const userRepository = UserDataSource.getRepository(UserEntity);
        return await userRepository.findOneBy({user: username})
    }
    @Authorized()
    @Query(() => [User], {description: "Query to bring all the users, you need to be an admin user to use this query"})
    async users() {
        const userRepository = UserDataSource.getRepository(UserEntity)
        return userRepository.query("SELECT * FROM users");
    }

    @Mutation(() => User, {description: "Mutation to create an user based on a username and a plain text password."})
    async createUser(@Args() userIn: UserInDto) {
        const {username, plain_password} = userIn;
        try
        {
            const userRepository = UserDataSource.getRepository(UserEntity)
            const _user = userRepository.create({
                user: username,
                plain_password: plain_password,
                hash_password: await bcrypt.hash(plain_password, 8)
            });
            const _save = await userRepository.save(_user);
            return _save;
        }
        catch(err)
        {
            console.error(err)
            throw new Error("No se ha podido generar el usuario.");
        }            
    }

    @Mutation(() => Boolean, {description: "Mutation to delete an user by an ID."})
    async deleteUser(@Arg("ID") ID: number): Promise<Boolean> {
        try
        {
            const userRepository = UserDataSource.getRepository(UserEntity)
            await userRepository.delete({ID: ID})
            return true;
        }
        catch (err)
        {
            console.error(err)
            throw new Error("No se pudo borrar el usuario seleccionado.")
        }
    }

    @Mutation(() => User, {description: "Mutation to update the username and plain text password of an user."})
    async updateUser(@Args() user: UserInDto) {
        try {
            const {ID, username, plain_password} = user;
            const userRepository = UserDataSource.getRepository(UserEntity)
            const _updateEntity = await userRepository.update({ID: ID}, {user: username, plain_password: plain_password}) 
            console.log(_updateEntity)
            return _updateEntity
        } catch (error) {
            console.error(error)
            throw new Error("No se pudo actualizar la información de usuario correspondiente");
        }
    }

    @Mutation(() => User)
    async login(@Arg("username") username: string, @Arg("password") password: string) {
        const userRepository = UserDataSource.getRepository(UserEntity)
        let _user = await userRepository.findOne({where: {user: username}})
        let isUserValid = await bcrypt.compare(password, _user.hash_password)
        if(!isUserValid)
            return false;

        const token = jwt.sign({_id: _user.ID}, process.env.JWT_TOKEN)

    }
}