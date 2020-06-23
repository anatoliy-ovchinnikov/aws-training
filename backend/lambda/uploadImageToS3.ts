import * as AWS from 'aws-sdk';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

exports.handler = (event: any, context:any, callback:any) => {
    const item = JSON.parse(event.body);
    const imageId = uuidv4();
    const decodedImage = Buffer.from(item.image, 'base64');

    const s3 = new AWS.S3();
    const params = {
        "Bucket": process.env.BUCKET_NAME || '',
        "Key": imageId + ".png",
        "Body": decodedImage,
        "ContentType " : "mime/png",
        "ACL": "public-read"
    }

    s3.upload(params, (err: any, data: any) => {
        if (err) {
            callback(err, null);
        } else {
            const result = {
                id: imageId,
                data: JSON.stringify(data)
            }
            const response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(result)
            };
            callback(null, response);
        }
    });
}