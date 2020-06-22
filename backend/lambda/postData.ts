import * as AWS from 'aws-sdk';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

exports.handler = async function (event: any) {
    if (!event.body) {
        return { statusCode: 400, body: 'invalid request, you are missing the parameter body' };
    }

    const db = new AWS.DynamoDB.DocumentClient();
    const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    item['id'] = uuidv4();
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: item
    };

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
};