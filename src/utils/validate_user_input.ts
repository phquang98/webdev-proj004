// recommend user 3rd party libs here

import { GQLFieldError } from "../types/field_error";
import { RegisterInput } from "../types/register_input";

export const validateUserInput = (registerInputHere: RegisterInput): GQLFieldError | null => {
  if (!registerInputHere.email.includes("@")) {
    return {
      errored_field: "email",
      gql_error_message: "Email must include a @ char!"
    };
  }

  if (registerInputHere.username.includes("@")) {
    return {
      errored_field: "email",
      gql_error_message: "Username should not contain @ char!"
    };
  }

  if (registerInputHere.username.length <= 2) {
    return {
      errored_field: "username",
      gql_error_message: "Username must be longer than 2 chars!"
    };
  }

  if (registerInputHere.password.length <= 2) {
    return {
      errored_field: "password",
      gql_error_message: "Password must be longer than 2 chars!"
    };
  }

  return null;
};
