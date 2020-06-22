import * as cdk from '@aws-cdk/core';
import * as apiHandler from '../handler/apiHandler'

export class AwsTrainingStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new apiHandler.ApiHandler(this, 'ApiHandler');
  }
}
