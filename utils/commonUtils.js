const convertToJSONResponse = (dataString, noLogs = false) => {
    if (!noLogs) console.log('convertToJSONResponse', dataString);
    if (dataString == null) return dataString;
    else if (typeof dataString !== 'string' || !dataString instanceof String)
      return JSON.stringify(dataString, null, 4);
    else
      try {
        return JSON.stringify(JSON.parse(dataString), null, 4);
      } catch (e) {
        return JSON.stringify({ data: dataString }, null, 4);
      }
  };

module.exports.returnSuccessResponse = (
    callback = null,
    body = {},
    statusCode = 200,
    skipLog = false
  ) => {
    if (!skipLog) {
      console.log('returnSuccessResponse.body', statusCode, body);
    }
  
    try {
      const response = {
        statusCode: statusCode,
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      },
        body: convertToJSONResponse(body),
      };
  
      if (!skipLog) {
        console.log('returnSuccessResponse.response', response);
      }
  
      return callback ? callback(null, response) : response;
    } catch (error) {
      console.log('returnSuccessResponse.error', error);
    }
  };
  
