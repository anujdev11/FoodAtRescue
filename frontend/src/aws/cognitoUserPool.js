import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_R26V04EoC",
  ClientId: "6k9jcan69iab73hi3n3h18qgm5",
};

export default new CognitoUserPool(poolData);
