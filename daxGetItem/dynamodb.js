const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-west-2' });

const AmazonDaxClient = require("amazon-dax-client");
const dax = new AmazonDaxClient({
    endpoints: ['dax-notes-app.hllvre.clustercfg.dax.usw2.cache.amazonaws.com:8111'],
    region: 'us-west-2'
});

exports.handler = (event, context, callback) => {
    dax.getItem({
        TableName: "td_notes_test",
        Key: {
            user_id: {
                S: event.user_id.toString()
            },
            timestamp: {
                N: event.timestamp.toString()
            }
        }
    }, (err, data)=>{
        if(err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
};