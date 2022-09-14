import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @Column()
    user: String
    @Column()
    plain_password: String
    @Column()
    hash_password: String
}