import { Field, ObjectType } from "type-graphql";

import { DataTest } from "../models/DataTest";
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

  // TODO: del this
  @Field({ nullable: true })
  testData?: DataTest;

  // TODO: del this
  @Field((_type) => [DataTest], { nullable: true })
  testDataClt?: DataTest[];

  @Field((_type) => [GQLFieldError], { nullable: true }) // for graphql
  gql_field_error?: GQLFieldError[];
}
