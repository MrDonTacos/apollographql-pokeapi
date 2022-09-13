import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UserInDto {
    @Field({description: "Set username"})
    user: String
    @Field({description: "Set user password"})
    plain_password: String
}