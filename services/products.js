const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "***REMOVED***",
  secretAccessKey: "***REMOVED***",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
});

let docClient = new AWS.DynamoDB.DocumentClient();
var table = "products";

exports.add = async (params) => {
  const item = {
    TableName: table,
    Item: {
      productId: uuidv4(),
      stock: params.stock,
      productName: params.productName,
      isDiscount: params.isDiscount,
      category: {
        categoryId: uuidv4(),
        categoryName: params.categoryName
      }
    }
  }
  try {
    await docClient.put(item).promise()
    return {
      status: true,
      message: "Product is added"
    }
  } catch (err) {
    return {
      status: false,
      message: err
    }
  }
}

exports.fetch = async (params) => {
  var item = {
    TableName: table,
    Key: {
      productId: params,
    },
  };
  try {
    const data = await docClient.get(item).promise()
    return {
        status: true,
        data: data,
      }
} catch (err) {
    return {
      status: false,
      message: err
    }
  } 
   
 };

exports.fetchAll = async () => {
  var item = {
    TableName: table,
    Select: "ALL_ATTRIBUTES",
  };

  try {
    const data = await docClient.scan(item).promise();
    return {
      status: true,
      data: data,
    };
  } catch (err) {
    return {
      status: false,
      message: err,
    };
  } 
};

exports.update = async (params) => {
  var item = {
    TableName: table,
    Key: {
      productId: params.params.id,
    },
    UpdateExpression: "set stock = :stock",
    ExpressionAttributeValues: {
      ":stock": params.body.stock,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    await docClient.update(item).promise();
    return {
      status: true,
      message: "Stock is updated",
    };
  } catch (err) {
    return {
      status: false,
      message: err,
    };
  }
};

exports.delete = async (params) => {

var item = {
  TableName: table,
  Key: {
    productId: params,
  },
  ConditionExpression: "isDiscount = :isDiscount",
  ExpressionAttributeValues: {
    ":isDiscount": false,
  },
};
  
  try {
    await docClient.delete(item).promise();
    return {
      status: true,
      message: "Product is deleted",
    };
  } catch (err) {
    return {
      status: false,
      message: err,
    };
  }
};

exports.fetchDiscountedProducts = async () => {
  var item = {
    TableName: table,
    FilterExpression: "isDiscount = :isDiscount",
    ExpressionAttributeValues: {
      ":isDiscount": true,
    },
  };

  try {
    const data = await docClient.scan(item).promise();
    return {
      status: true,
      data: data,
    };
  } catch (err) {
    return {
      status: false,
      message: err,
    };
  }
};
