import * as constants from './actionTypes';
import { fromJS } from 'immutable';
import axios from 'axios';
import { BASE_URL } from '../../../environment';


const initListAction = data => ({
    type: constants.INIT_LIST_ACTION,
    data: fromJS(data),
})

export const getList = orderId => {
    return async (dispatch) => {
        const response = await axios.get(`${BASE_URL}/${orderId}`)
              .catch(err => console.log(err));
        const { products } = response.data;
        const action = initListAction(products);
        dispatch(action);
    }
}
