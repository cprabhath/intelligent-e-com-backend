const ResponseService = (res, status, message) => {
    return res.status(status).json({
      status: status,
      message: message,
    });
};

module.exports = ResponseService;
