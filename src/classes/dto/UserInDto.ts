import { ArgsType, Field, ID, Int } from "type-graphql";

@ArgsType()
export class UserInDto {
    @Field(type => Int, {description: "ID Field only use this field if you want to update the corresponding user."})
    ID: number
    @Field({description: "Set username."})
    username: string
    @Field({description: "Set user password."})
    plain_password: string
}