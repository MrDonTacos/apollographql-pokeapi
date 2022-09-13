import { Args, Authorized, Mutation, Resolver } from "type-graphql";
import { UserInDto } from "../classes/dto/UserInDto";
import { User } from "../classes/User";

@Resolver(of => User)
export class UserResolver {
    @Mutation()
    createUser(@Args() userIn: UserInDto): Boolean {
        const {user, plain_password} = userIn;
        console.log(`El usuario: ${user} con password ${plain_password} se ha registrado`)
        return true;
    }
}