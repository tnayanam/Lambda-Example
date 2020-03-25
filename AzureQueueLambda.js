var AWS = require("aws-sdk");
var azure = require("azure-sb");
var parse = AWS.DynamoDB.Converter.output;
exports.handler = function( event, context, callback ) {
   var serviceBusService = azure.createServiceBusService(
    "Endpoint=sb://youngtanuj.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=LPoZS9sPrNwQXO/kg0Ig1gIsb3sR+S8kl7eI8OLAL1g="
  );
  var docClient = new AWS.DynamoDB.DocumentClient();
  event.Records.forEach((record) => {
   console.log("Tanuj");
     var event_name = record["eventName"];
    if (event_name == "REMOVE") {
      var obj3 = parse({ "M": record.dynamodb.OldImage });
          console.log(obj3); 
      serviceBusService.sendQueueMessage("young", obj3, function(error) {
      if (!error) {
        console.log("message sent");
      }
    });
    }
          
          
    });
  callback(null, `Successfully processed ${event.Records.length} records.`);}