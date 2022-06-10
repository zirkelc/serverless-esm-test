import type { AWS } from '@serverless/typescript';

// import hello from './src/functions/hello/index';
// import hello = require('./src/functions/hello/index.ts');

const serverlessConfiguration: AWS = {
  service: 'serverless-esm-test',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { hello: {
    handler: `./src/functions/hello/handler.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'hello',
        },
      },
    ],
   },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      format: 'esm',
      outExtension: {'.js':'.mjs'},
      bundle: true,
      minify: false,
      sourcemap: true,
      keepOutputDirectory: true,
      external: ['aws-sdk'],
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

// module.exports = serverlessConfiguration;
export default serverlessConfiguration;
