import { Query, Resolver } from "type-graphql";

// ? is this kinda similar to handlers
@Resolver()
export class HelloResolver {
  @Query((_return) => String) // String type from GraphQL, wtf with the _ at the start ???
  hello() {
    return "Hello world!";
  }
}
