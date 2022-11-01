const aws = require("aws-sdk");
const { v4 } = require("uuid");
const { returnSuccessResponse } = require("./utils/commonUtils");
const db = new aws.DynamoDB.DocumentClient({
  region: 'ap-south-1'
});

module.exports.addTodo = async (event, context) => {
  const reqBody = JSON.parse(event.body);
  const singleTodo = {
    ...reqBody,
    todoId: v4()
  };
  try{
    await db.put({
      TableName: 'TodosTable',
      Item: singleTodo
    }).promise();
    return returnSuccessResponse(singleTodo);
  } catch(e){
      return {
        statusCode: 404,
        body: e,
      };
  }
};

module.exports.getTodos = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Got all todos successfully",
        input: event,
      },
      null,
      2
    ),
  };
};
