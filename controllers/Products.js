const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const productsService = require("../services/products");

exports.add = async (req, res) => {
  const response = await productsService.add(req.body);
  res.send(response);
};

exports.fetch = async (req, res) => {
  const data = await productsService.fetch(req.params.id);
  let response = {
    status: true,
    data: data,
  };
  res.send(response);
};

exports.fetchAll = async (req, res) => {
  const data = await productsService.fetchAll();
  let response = {
    status: true,
    data: data,
  };
  res.send(response);
};

exports.update = async (req, res) => {
  const response = await productsService.update(req);
  res.send(response);
};

exports.delete = async (req, res) => {
  const response = await productsService.delete(req.params.id);
  res.send(response);
};

exports.fetchDiscountedProducts = async (req, res) => {
  const data = await productsService.fetchDiscountedProducts();

  let response = {
    status: true,
    data: data,
  };
  res.send(response);
};