import { Field, ObjectType } from "type-graphql";

import { User } from "../models/User";
import { GQLFieldError } from "./field_error";
import { IMutationResponse } from "./mutation_res";

@ObjectType({ implements: IMutationResponse })
export class UserMutationResponse implements IMutationResponse {
  code: number;
  success: boolean;
  message?: string;

  @Field({ nullable: true })
  user?: User;

  @Field((_type) => [GQLFieldError], { nullable: true }) // for graphql
  gql_field_error?: GQLFieldError[];
}
