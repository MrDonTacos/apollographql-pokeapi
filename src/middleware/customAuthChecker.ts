import { Context } from "apollo-server-core";
import { AuthChecker, ResolverData } from "type-graphql";
import UserDataSource from "../dataSources/UserDataSource";
import { UserEntity } from "../entity/UserEntity";
import CustomContext from "./customContext";

export const customAuthChecker: AuthChecker<CustomContext> = ({ root, args, context, info }, roles,) : boolean => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    console.log("headers:", context.user)
    return true; // or false if access is denied
  };