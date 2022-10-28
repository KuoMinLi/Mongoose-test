const headers = require('./headers.js');

function successHandler(res, data) {
  res.writeHead(200, headers);
  res.write(JSON.stringify({
    status: 'success',
    data: data,
  }));
  res.end();
}

function errorHandler(res, data) {
  res.writeHead(400, headers);
  res.write(JSON.stringify({
    status: 'false',
    data: data,
  }));
  res.end();
}

module.exports = {
  successHandler,
  errorHandler,
}