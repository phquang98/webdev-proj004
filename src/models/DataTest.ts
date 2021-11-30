import { Field, ObjectType, ID } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@ObjectType()
@Entity("data_test")
export class DataTest extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  transactType: string;

  @Field()
  @CreateDateColumn()
  timestampAccepted: Date;

  @Field()
  @Column()
  volume: string;
}
