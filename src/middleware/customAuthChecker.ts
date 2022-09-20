import { Context } from "apollo-server-core";
import { AuthChecker, ResolverData } from "type-graphql";
import UserDataSource from "../dataSources/UserDataSource";
import { UserEntity } from "../entity/UserEntity";
import { resolvers } from "../resolvs";
import CustomContext from "./customContext";
const jwt = require('jsonwebtoken')
require('dotenv').config()

export const customAuthChecker: AuthChecker<CustomContext> = ({ root, args, context, info }, roles,) : boolean => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
    const [Bearer, token] = context.auth.split(' ')
    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
      if(err) 
      {
        context.isAllowed = false
        return false
      }
      else 
      {

        context.isAllowed = true
        return true;
      }
    })
    return true
  };