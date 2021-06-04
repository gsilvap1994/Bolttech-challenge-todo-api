module.exports = errorHandler;

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === 'string':
      // custom application error
      const is404 =
        err.toLowerCase().endsWith('exist') ||
        err.toLowerCase().endsWith('exists');
      const is401 = err.toLowerCase() == 'unauthorized';
      const statusCode = is404 ? 404 : is401 ? 401 : 400;
      return res.status(statusCode).json({ message: err });
    default:
      return res.status(500).json({ message: 'Something went wrong' });
  }
}
