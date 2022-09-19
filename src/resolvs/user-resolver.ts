import { Arg, Args, Authorized, ID, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { UserInDto } from "../classes/dto/UserInDto";
import { User } from "../classes/User";
import UserDataSource from "../dataSources/UserDataSource";
import { UserEntity } from "../entity/UserEntity";
import { UserRepository } from "../dataSources/repository/UserRepository";
import {Inject, Service} from 'typedi'
import Response from "../classes/helpers/response";
import GenericReponse from "../classes/helpers/response";
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcryptjs')

@ObjectType({description: "Generic object used to wrap a custom reponse"})
class ResponseUser extends GenericReponse(User)  {
    token: string
}


@Service()
@Resolver(of => User)
export class UserResolver {
    private readonly _userRepository: Repository<UserEntity>;
    constructor(userRepository: UserRepository)
    {
        this._userRepository = userRepository.getUser() 
    }
    @Authorized()
    @Query(() => User, {description: "Query to fetch current user data, you need to be the user who is consulting the data to use this query"})
    async user(@Arg("username") username: string, @Arg("password") password: string) {
        return await this._userRepository.findOneBy({user: username})
    }
    @Authorized()
    @Query(() => [User], {description: "Query to bring all the users, you need to be an admin user to use this query"})
    async users() {
        return this._userRepository.query("SELECT * FROM users");
    }

    @Mutation(() => User, {description: "Mutation to create an user based on a username and password."})
    async createUser(@Args() userIn: UserInDto) {
        const {username, plain_password} = userIn;
        try
        {
            const _user = this._userRepository.create({
                user: username,
                hash_password: await bcrypt.hash(plain_password, 8)
            });
            const _save = await this._userRepository.save(_user);
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
            await this._userRepository.delete({ID: ID})
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
            const _updateEntity = await this._userRepository.update({ID: ID}, {user: username, plain_password: plain_password}) 
            console.log(_updateEntity)
            return _updateEntity
        } catch (error) {
            console.error(error)
            throw new Error("No se pudo actualizar la información de usuario correspondiente");
        }
    }

    @Mutation(() => ResponseUser,{description: "Login mutation, it receives an user and password"})
    async login(@Arg("username") username: string, @Arg("password") password: string): Promise<ResponseUser> {
        let _user = await this._userRepository.findOne({where: {user: username}})
        let isUserValid = await bcrypt.compare(password, _user.hash_password)
        if(!isUserValid)
            return {
                success: false,
                message: "El usuario o contraseña no es valido",
                genericObject: _user,
                code: 500,
                token: ""
            }

        return {
            success: true,
            message: "Login realizado exitosamente",
            genericObject: _user,
            code: 200,
            token: ""
        }

        const token = jwt.sign({_id: _user.ID}, process.env.JWT_TOKEN)

    }
}