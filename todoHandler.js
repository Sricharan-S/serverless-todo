const aws = require("aws-sdk");
const { v4 } = require("uuid");
const { returnSuccessResponse } = require("./utils/commonUtils");
const db = new aws.DynamoDB.DocumentClient({
  region: 'ap-south-1'
});

const scanAll = async (params) => {
  let lastEvaluatedKey = 'dummy'; // string must not be empty
  const itemsAll = [];
  while (lastEvaluatedKey) {
    const data = await db.scan(params).promise();
    itemsAll.push(...data.Items);
    lastEvaluatedKey = data.LastEvaluatedKey;
    if (lastEvaluatedKey) {
      params.ExclusiveStartKey = lastEvaluatedKey;
    }
  }
  return itemsAll;
}

module.exports.addTodo = async (event, context) => {
  const reqBody = JSON.parse(event.body);  
  const singleTodo = {
    ...reqBody,
    ID: v4()
  };
  try{
    await db.put({
      TableName: 'TodosTable',
      Item: singleTodo,
    }).promise();
    return returnSuccessResponse(null, singleTodo);
  } catch(e){
      return {
        statusCode: 404,
        body: e,
      };
  }
};

module.exports.getTodos = async (event, context) => {
  try{
    const allItems = await scanAll({ TableName: 'TodosTable' });
     return returnSuccessResponse(null, allItems);
  } catch(e){
    return {
      statusCode: 404,
      body: e,
    }
  }
};
