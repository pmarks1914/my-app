export const REACT_APP_ENVIRONMENT = "PROD";
let PROD_OBJ = {};

PROD_OBJ["BASE_URL"] = "https://pythonrestapibooks.herokuapp.com";
PROD_OBJ["BASE_API_URL_AUTH"] = PROD_OBJ.BASE_URL + "/login";
PROD_OBJ["BASE_URL_GET_USERS"] = PROD_OBJ.BASE_URL + "/auth/users";
PROD_OBJ["BASE_URL_ADD_USER"] = PROD_OBJ.BASE_URL + "/auth/user";
PROD_OBJ["BASE_URL_UPDATE_USER"] = PROD_OBJ.BASE_URL + "/user";
PROD_OBJ["BASE_URL_ACC"] = PROD_OBJ.BASE_URL + "/auth/account";
PROD_OBJ["BASE_URL_ACCS"] = PROD_OBJ.BASE_URL + "/auth/accounts";


export const PROD = PROD_OBJ;