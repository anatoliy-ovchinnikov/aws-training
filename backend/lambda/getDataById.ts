import * as AWS from 'aws-sdk';

exports.handler = async function (event: any) {
    const requestedItemId = event.pathParameters.id;
    if (!requestedItemId) {
        return { statusCode: 400, body: `Error: You are missing the path parameter id` };
    }

    const db = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Key: {
            ['id']: requestedItemId
        }
    };

    try {
        const response = await db.get(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(response.Item)
        };
    } catch (dbError) {
        return {
            statusCode: 500,
            body: JSON.stringify(dbError)
        };
    }
};