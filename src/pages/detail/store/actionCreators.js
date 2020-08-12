import * as constants from './actionTypes';
import { fromJS } from 'immutable';
import { filterObjByKey, convertCodeToMessage } from '../../../utils/utils';
import { COLUMN_SCHEMA } from '../../../utils/constants';
import { BASE_URL } from '../../../environment';
import axios from 'axios';

const initListAction = data => ({
    type: constants.INIT_LIST_ACTION,
    data: fromJS(data),
})

const getErrorsAction = data => ({
    type: constants.GET_EROORS_ACTION,
    data: fromJS(data)
})

/**
 * Collect all the errors from response data, formated as 
 * [{name: 'Error', status: 500, row: 10, code: RES_ERROR}, ...]
 * @function collectErrors
 * @param { Object } data response data 
 * @return { Array } an array of errors e.g. [{name: 'Error', status: 500, row: 10, code: RES_ERROR}, ...]
 * 
 */
const collectErrors = data => {
    return data.reduce((res, orderObjs) => {
        Object.values(orderObjs).map(orderObj => {
            orderObj.orders.map(order => order.line_items.map(item => {
                if (typeof item['product_url'] === 'object') {
                    res = [...res, item['product_url']];
                }
                if (isNaN(item['revenue'])) {
                    res = [...res, item['revenue']];
                }
                return res;
             }))
        })
        return res;
    }, [])
}

/**
 * formated response data, if any errors, replace it's feild as empty string or null
 * @function formatResponseErrorData
 * @param { Object } data response data 
 * @return { Array } 
 */
const formatResponseErrorData = data => {
    if (!data || !data.length) return [];
    return data.reduce((res, orderObjs) => {
        Object.values(orderObjs).map(orderObj => {
            orderObj.orders.map(order => order.line_items.map(item => {
                if (typeof item['product_url'] === 'object') item['product_url'] = '';
                if (!item['revenue'] || isNaN(item['revenue'])) item['revenue'] = NaN;
             }))
        })
      return [...res, ...data];
    }, []);
}

export const getErrors = orderId => {
    return async (dispatch) => {
        const response = await axios.get(`${BASE_URL}/api/order/${orderId}`)
              .catch(err => console.log(err));
        const data = response.data;
        const errors = collectErrors(data)
              .map(error => convertCodeToMessage(error))
              .map(error => filterObjByKey(error, COLUMN_SCHEMA.NAMES))
        const action = getErrorsAction(errors);
        dispatch(action);
    }
}

export const getList = orderId => {
    return async (dispatch) => {
        const response = await axios.get(`${BASE_URL}/api/order/${orderId}`)
              .catch(err => console.log(err));
        const data = formatResponseErrorData(response.data);
        const action = initListAction(data);
        dispatch(action);
    }
}
