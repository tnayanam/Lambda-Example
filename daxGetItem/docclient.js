const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-west-2' });

const AmazonDaxClient = require("amazon-dax-client");
const dax = new AmazonDaxClient({
    endpoints: ['dax-notes-app.hllvre.clustercfg.dax.usw2.cache.amazonaws.com:8111'],
    region: 'us-west-2'
});

const docClient = new AWS.DynamoDB.DocumentClient({
    service: dax
});

exports.handler = (event, context, callback) => {
    docClient.get({
        TableName: 'td_notes_test',
        Key: {
            user_id: event.user_id,
            timestamp: parseInt(event.timestamp)
        }
    }, (err, data)=>{
        if(err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
};