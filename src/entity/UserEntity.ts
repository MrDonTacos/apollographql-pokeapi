import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    ID: number
    @Column()
    user: string
    @Column()
    plain_password: string
    @Column()
    hash_password: string
}