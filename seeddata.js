const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var uuid = require("uuid");
const docClient = new AWS.DynamoDB.DocumentClient();
for (var i = 0; i < 200; i++) {
  docClient.put(
    {
      TableName: "ExpirationTblTTL",
      Item: {
        id: uuid.v1(),
        retailer_id: "87B72791-826F-40B2-9E78-DDF5B651A5C3",
        user_id: "e64ccbb0-d883-11e8-873f-ff820afcff0c",
        expiry: 1584690782 + i
      }
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}
