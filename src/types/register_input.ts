import { Field, InputType } from "type-graphql";

@InputType() // not object_type, as this is use as args for resolvers -> input_type instead
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;
}
