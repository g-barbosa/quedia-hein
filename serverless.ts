import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'quediahein',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: []
  },

  functions: { 
    quediahein: {
      handler: "src/functions/posts.handler",
      timeout: 30,
      events: [{
        schedule: "rate(1 day)"
      }]
    }
   },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      external: ['axios', 'crypto', 'oauth-1.0a']
    },
  },
};

module.exports = serverlessConfiguration;
