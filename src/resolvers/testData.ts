import { Query, Resolver } from "type-graphql";

import { DataTest } from "../models/DataTest";
import { UserMutationResponse } from "../types/user_mutation_res";

@Resolver()
export class TestingResolver {
  @Query((_return) => UserMutationResponse, { nullable: true }) // String type from GraphQL
  async test_generateFakeData(): Promise<UserMutationResponse> {
    // tao fakeData
    const transactClt = ["Housing fees", "Foods and Drinks", "Entertainment"];
    const transactType = transactClt[Math.floor(Math.random() * 3)];

    const volume = Math.floor(Math.random() * 1000).toString();

    // viet vao db
    const randomData = DataTest.create({ transactType, volume });
    console.log("clgt", randomData);
    const newData = await DataTest.save(randomData);

    // tra ve client de render
    return {
      code: 200,
      success: true,
      message: "Tao data testing OK!",
      testData: newData
    };
  }

  @Query((_return) => UserMutationResponse)
  async listAllFakeData(): Promise<UserMutationResponse> {
    // lay data
    const newData = await DataTest.find();
    console.log("dung khong ?", newData);

    // tra ve client
    return {
      code: 200,
      success: true,
      message: "Lay het data fake OK!",
      testDataClt: newData
    };
  }
}
