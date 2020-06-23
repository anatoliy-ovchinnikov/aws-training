import * as AWS from 'aws-sdk'; 

exports.handler = (event: any, context: any, callback: any) => {
    var s3 = new AWS.S3();
    var params = {
        "Bucket": process.env.BUCKET_NAME || '',
        "Key": event.queryStringParameters.id + '.png'
    };
    s3.getObject(params, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            let response = {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(data)
            };
            callback(null, response);
        }
    });

};