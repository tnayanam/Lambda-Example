const AWS = require("aws-sdk");
AWS.config.update({ region: 'us-west-2' });

const _ = require("underscore");
const moment = require("moment");

const dynamodb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    event.Records.forEach((record)=>{
        dynamodb.listBackups({
            TableName: record.TableName
        }, (err, data)=>{
            if(err) {
                console.log(err);
            } else {
                let backups = _.sortBy(data.BackupSummaries, 'BackupCreationDateTime');
                let backupsToRemove = record.RetentionCount - 1;
                backups.splice(-backupsToRemove, backupsToRemove);

                backups.forEach((backup)=>{
                    dynamodb.deleteBackup({
                        BackupArn: backup.BackupArn
                    }, (err, data)=>{
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                    });
                });

                dynamodb.createBackup({
                    TableName: record.TableName,
                    BackupName: record.TableName + '_' + moment().unix()
                }, (err, data)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
    });
    callback(null, "Execution Successful");
}
