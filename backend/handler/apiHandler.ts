import * as core from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as dynamoDb from '@aws-cdk/aws-dynamodb';

export class ApiHandler extends core.Construct {
    constructor(scope: core.Construct, id: string) {
        super(scope, id);

        const dynamoItemsTable = new dynamoDb.Table(this, 'Items', {
            partitionKey: {
                name: 'id',
                type: dynamoDb.AttributeType.STRING
            },
            tableName: 'Items',
            removalPolicy: core.RemovalPolicy.DESTROY
        });

        const getListFunction = new lambda.Function(this, 'GetListFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'getListData.handler',
            environment: {
                TABLE_NAME: dynamoItemsTable.tableName
            }
        });

        const getByIdFunction = new lambda.Function(this, 'GetByIdFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'getDataById.handler',
            environment: {
                TABLE_NAME: dynamoItemsTable.tableName
            }
        });

        const postDataFunction = new lambda.Function(this, 'PostFunction', {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'postData.handler',
            environment: {
                TABLE_NAME: dynamoItemsTable.tableName
            }
        });

        dynamoItemsTable.grantReadWriteData(getListFunction);
        dynamoItemsTable.grantReadWriteData(getByIdFunction);
        dynamoItemsTable.grantReadWriteData(postDataFunction);

        const api = new apiGateway.RestApi(this, 'api');

        const getListApiHandler = new apiGateway.LambdaIntegration(getListFunction);
        const getByIdHandler = new apiGateway.LambdaIntegration(getByIdFunction);
        const postHandler = new apiGateway.LambdaIntegration(postDataFunction);

        const apiResource = api.root.addResource('api');
        const v1Resource = apiResource.addResource('v1');
        const dataResource = v1Resource.addResource('data');
        const dataByIdResource = dataResource.addResource('{id}');

        dataResource.addMethod('GET', getListApiHandler);
        dataResource.addMethod('POST', postHandler);
        dataByIdResource.addMethod('GET', getByIdHandler);
    }
}