const aws = require('aws-sdk');

const SNS = new aws.SNS();

exports.handler = async (event, context, callback) => {
  const payload = typeof event == 'string' ? JSON.parse(event) : event;
  try {
    const topic = payload.id;
    const contacts = payload.contacts;
    const response = await SNS.createTopic({ Name: topic }).promise();
    contacts.forEach(async contact => {
      SNS.subscribe({
        Protocol: 'EMAIL',
        TopicArn: response.TopicArn,
        Endpoint: contact,
      }).promise();
    });
  } catch (e) {
    return console.log(e);
  }
  callback();
};
