const aws = require('aws-sdk');

const dynamoDB = new aws.DynamoDB.DocumentClient();
const SNS = new aws.SNS();

function getAge(date) {
  var today = new Date();
  var birthDate = new Date(date);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

exports.handler = async (event, context, callback) => {
  const payload = typeof event == 'string' ? JSON.parse(event) : event;
  try {
    const queryResult = await dynamoDB
      .scan({
        TableName: 'VigilAnomaly',
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': payload.user.id,
        },
      })
      .promise();
    const currentData = queryResult.Items.filter(
      item => item.id == payload.dataId
    );
    if (currentData.length != 1) return;
    const sentSNSData = queryResult.Items.filter(item => item.sentSNS);
    const max = Math.max(...sentSNSData.map(item => item.timeRecorded));
    const prevSNSItem =
      queryResult.Items[
        queryResult.Items.map(item => item.timeRecorded).indexOf(max)
      ];
    if (
      !prevSNSItem ||
      currentData[0].timeRecorded - prevSNSItem.timeRecorded > 300000
    ) {
      await SNS.publish({
        TopicArn: `arn:aws:sns:us-east-1:128321404669:${payload.user.id}`,
        Message:
          `We have detected an anomaly in the data of ${
            payload.user.name
          } (${getAge(payload.user.birthday)}, ` +
          `${payload.user.gender})\nThe data recieved are: \nheart-rate: ${currentData[0].heartRate}\n` +
          `temperature: ${currentData[0].temperature}\nhas fell: ${currentData[0].hasFell}\n` +
          `Time-recorded: ${new Date(currentData[0].timeRecorded)}`,
      }).promise();
      await dynamoDB
        .update({
          Key: { id: payload.dataId },
          TableName: 'VigilAnomaly',
          UpdateExpression: 'set sentSNS = :sentSNS',
          ExpressionAttributeValues: {
            ':sentSNS': true,
          },
        })
        .promise();
    }
  } catch (e) {
    console.log(e);
  }
  callback();
};
