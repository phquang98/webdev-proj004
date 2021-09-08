import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @Column({})
  post_title: string;

  @Column({})
  post_body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
