const isDevelopment = false; // localohst -> true || live -> false
const env = {
  websiteDomain: isDevelopment
    ? "http://localhost:7000"
    : "https://heathrow-gatwick-transfers.com",
  apiDomain: "https://api.london-tech.com",
  status: {
    error: 403,
    success: 200,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    methodNotAllowed: 405,
    notAcceptable: 406,
    internalServerError: 500,
  },
};
export default env;

