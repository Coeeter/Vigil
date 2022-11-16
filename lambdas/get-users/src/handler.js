const aws = require('aws-sdk');

const iotData = new aws.IotData({
  endpoint: 'a1s0rmi8i5eq20-ats.iot.us-east-1.amazonaws.com',
});

const dynamoDB = new aws.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  const id = event.id;
  let user;
  try {
    user = await dynamoDB
      .get({
        TableName: 'VigilUser',
        Key: { id },
      })
      .promise();
  } catch (e) {
    return console.log(e);
  }
  iotData.publish(
    {
      topic: 'user-retrieved',
      payload: JSON.stringify(user),
      qos: 0,
    },
    (err, data) => {
      if (err) return console.log(err);
      console.log(data);
    }
  );
  callback();
};
