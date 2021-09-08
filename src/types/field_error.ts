import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GQLFieldError {
  @Field()
  errored_field: string;

  @Field()
  gql_error_message: string;
}
