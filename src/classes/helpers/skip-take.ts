import { ArgsType, Field, Int, ObjectType } from "type-graphql";


@ArgsType()
export class skipTakeArgs {
    @Field(type => Int, {nullable: true})
    limit: number
    @Field(type => Int, {nullable: true})
    offset: number
}