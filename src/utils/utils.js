import { ERROR_MESSAGE_SCHEMA } from './constants';

/**
 * give an array of selected keys, return an filtered object by thoes keys
 * @function filterObjByKey
 * @param { Object } rawObj
 * @param { Array } selectedKeys 
 * @returns an filtered object 
 */

export const filterObjByKey = (rawObj, selectedKeys) => {
    return Object.keys(rawObj)
        .filter(key => selectedKeys.includes(key))
        .reduce((obj, key) => {
          obj[key] = rawObj[key];
          return obj;
        }, {});
}

/**
 * convert error code to error message
 * @function convertCodeToMessage
 * @param { String } error code 
 * @returns { String } error message
 */
export const convertCodeToMessage = error => {
    if (!error || !error.code) return;
    error.message = ERROR_MESSAGE_SCHEMA[error.code];
    return error;
}