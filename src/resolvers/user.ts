import argon2 from "argon2";
import { Arg, Mutation, Resolver } from "type-graphql";

import { User } from "../models/User";

@Resolver()
export class UserResolver {
  @Mutation((_return) => User, { nullable: true })
  // ? need to transform all these args from TS -> type-graphql -> using @Arg decorator
  async register(@Arg("email") email: string, @Arg("username") username: string, @Arg("password") password: string) {
    try {
      const existingUser = await User.findOne({
        where: [{ username }, { email }]
      }); // findOne from typeorm
      if (existingUser) {
        return null;
      } else {
        const hashedPass = await argon2.hash(password);

        const newUser = User.create({
          username,
          password: hashedPass,
          email
        });
        return await User.save(newUser);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
