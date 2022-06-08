import type { Handler } from "aws-lambda";
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';

const sleep = (ms: number) => new Promise(resolve => {
  setTimeout(resolve, ms)
});

await sleep(500);

const hello: Handler = async (event) => {
  return formatJSONResponse({
    message: `Hello from Serverless on Node 16 with ESM and Top-Level-Await!`,
    event,
  });
};

export const main = middyfy(hello);
