import { Field, InterfaceType } from "type-graphql";

@InterfaceType() // make thats TS interface type -> GraphQL interface type
export abstract class IMutationResponse {
  // abstract -> from type-graphql

  @Field() // notice here we dont use decorators from typeorm, as this files only usage is to structure the response data from graphql, dont care about postgreSQL
  code: number;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
