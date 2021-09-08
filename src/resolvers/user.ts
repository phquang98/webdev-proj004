import argon2 from "argon2";
import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../models/User";
import { UserMutationResponse } from "../types/user_mutation_res";

@Resolver()
export class UserResolver {
  @Mutation((_return) => UserMutationResponse, { nullable: true })
  // ? need to transform all these args from TS -> type-graphql -> using @Arg decorator
  async register(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<UserMutationResponse> {
    try {
      const existingUser = await User.findOne({
        where: [{ username }, { email }]
      }); // findOne from typeorm
      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: "Duplicate user and/or email.",
          gql_field_error: [
            {
              // neu ton tai 1 thang trung -> neu ten thang trung trung voi ten truyen vao ham -> loi do ten, else loi do email
              errored_field: existingUser.username === username ? "username" : "email",
              gql_error_message: `${existingUser.username === username ? "Username" : "Email"} already taken!`
            }
          ]
        };
      } else {
        const hashedPass = await argon2.hash(password);

        const newUser = User.create({
          username,
          password: hashedPass,
          email
        });

        return {
          code: 200,
          success: true,
          message: "User registered OK!",
          user: await User.save(newUser)
        };
      }
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: `Internal server error, ${error}`
      };
    }
  }
}
