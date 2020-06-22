import * as core from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';

export class ApiHandler extends core.Construct {
    constructor(scope: core.Construct, id: string) {
        super(scope, id);

        const getListFunction = new lambda.Function(this, 'GetListFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'getList.handler'
          });
      
        const api = new apiGateway.RestApi(this, 'api');

        const getApiHandler = new apiGateway.LambdaIntegration(getListFunction);

        const apiResource = api.root.addResource('api');
        const v1Resource = apiResource.addResource('v1');
        const dataResource = v1Resource.addResource('data');

        dataResource.addMethod('GET', getApiHandler);
    }
}