exports.handler = async function (event: any) {
    var requestData = `request received with data: ${JSON.stringify(event)}`;
    console.log(requestData);
    return {
        body: requestData,
        statusCode: 200,
        headers: { "Content-Type": "text/plain" }
    };
};