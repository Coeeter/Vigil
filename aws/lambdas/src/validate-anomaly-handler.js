const aws = require('aws-sdk');

const dynamoDB = new aws.DynamoDB.DocumentClient();
const lambda = new aws.Lambda({ region: 'us-east-1' });

exports.handler = async (event, context, callback) => {
  const payload = JSON.parse(
    Buffer.from(event.Records[0].kinesis.data, 'base64').toString()
  );
  const id = payload.userId;
  if (!id) return console.log('Invalid userId provided: ' + id);
  try {
    const user = await dynamoDB
      .get({
        TableName: 'VigilUser',
        Key: { id },
      })
      .promise();
    await dynamoDB
      .put({
        TableName: 'VigilAnomaly',
        Item: {
          id: payload.id,
          userId: user.Item.id,
          heartRate: payload.heartRate,
          temperature: payload.temperature,
          timeRecorded: payload.timeRecorded,
          hasFell: payload.hasFell,
          sentSNS: false,
        },
      })
      .promise();
    await lambda
      .invoke({
        FunctionName: 'send-sns',
        Payload: JSON.stringify({
          user: user.Item,
          dataId: payload.id,
        }),
      })
      .promise();
  } catch (e) {
    return console.log(e);
  }
  callback();
};
