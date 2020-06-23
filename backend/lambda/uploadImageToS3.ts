import * as AWS from 'aws-sdk';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

exports.handler = async function (event: any) {
    if (!event.body) {
        return { statusCode: 400, body: 'Invalid request, you are missing the parameter body' };
    }

    const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);

    console.log('Body: ' + JSON.stringify(item));

    const imageId = uuidv4();
    const decodedImage = Buffer.from(item.image, 'base64');
    const s3 = new AWS.S3();
    const params = {
        Bucket: process.env.BUCKET_NAME || '',
        Key: imageId,
        Body: decodedImage,
        ACL: "public-read"
    }

    return s3.upload(params, (err: any, data: any) => {
        if (err) {
            return {
                statusCode: 400,
                body: JSON.stringify(err) + ' - error object'
            }
        } else {
            return {
                statusCode: 200,
                body: {
                    id: imageId,
                    data: JSON.stringify(data)
                }
            };
        }
    });
}