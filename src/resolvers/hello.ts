import { Query, Resolver } from "type-graphql";

// ? is this kinda similar to handlers
@Resolver()
export class HelloResolver {
  @Query((_return) => String) // String type from GraphQL
  hello(): string {
    return "Hello world!";
  }
}
