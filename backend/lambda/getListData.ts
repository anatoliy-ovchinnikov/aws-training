import * as AWS from 'aws-sdk';

exports.handler = async function (event: any) {
    const db = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME || ''
    };

    try {
        const response = await db.scan(params).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(response.Items)
        };
    } catch (dbError) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(dbError)
        };
    }
};