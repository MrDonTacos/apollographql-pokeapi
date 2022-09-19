import { Service } from "typedi";
import { Repository } from "typeorm";
import { UserEntity } from "../../entity/UserEntity";
import UserDataSource from "../UserDataSource";

@Service()
export class UserRepository {
    getUser(): Repository<UserEntity> {
        return UserDataSource.getRepository(UserEntity);
    }
}