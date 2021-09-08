import { Field, ObjectType, ID } from "type-graphql";
import { Entity, BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// trong ngon ngu cua graphql tra ve 1 resolver, nhung truoc dong duoi User chi la 1 TS class, Entity chi de ni chuyen TS voi DB thong qua typeorm, chu chua he danh dau cai nay la dang graph ma no can tra ve
@ObjectType() // noi chuyen giua ts va graphql thong qua type-graphql
@Entity("user") // noi chuyen giua ts va postgressql thong qua typeorm
export class User extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true
  })
  username: string;

  @Field()
  @Column({
    unique: true
  })
  email: string;

  // @Field() do not return password, as this is secret info
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
