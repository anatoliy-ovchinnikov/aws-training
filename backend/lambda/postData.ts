import * as AWS from 'aws-sdk';

const saveToDb = async function (db: any, params: any) {
    try {
        await db.put(params).promise();
        return {
            statusCode: 201,
            body: ''
        };
    } catch (dbError) {
        return {
            statusCode: 500,
            body: dbError.message
        };
    }
}

exports.handler = async function (event: any) {
    if (!event.body) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    }
    const db = new AWS.DynamoDB.DocumentClient();

    const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: item
    };

    return await saveToDb(db, params);
};