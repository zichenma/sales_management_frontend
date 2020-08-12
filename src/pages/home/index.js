import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import _ from 'lodash';
import  { actionCreators } from './store';
import { Modal, Button, Input } from 'antd';
import Highliter from '../../common/highlighter';
import Table from './components/table';
import { HomeWrapper  } from './style';
import 'antd/dist/antd.css';


class Home extends PureComponent {
    filters = {};
    timerState = null;
    constructor(props){
        super(props)
        this.state = {
            filters : {},
            loading: false,
            visible: true,
            showText: false,
            orderId: ''
        } 
    }

    componentWillUnmount() {
        clearTimeout(this.timerState);
    }
    
    handleOk = () => {
        this.setState({ loading: true });
        this.timerState = setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleOnChange = e => {
        const { handleGetList, list} = this.props;
        e.persist();
        if (!this.debouncedFn) {
            this.debouncedFn =  _.debounce(() => {
                const orderId = e.target.value;
                this.setState({orderId})
                handleGetList(list, orderId);
                orderId.trim() ? this.setState({showText : true}) : this.setState({showText : false})
             }, 300);
        }
        this.debouncedFn();
    }

    render() {
        const { list  } = this.props;
        const { visible, loading, orderId, showText } =  this.state;
        const selectedData = list.toJS();
        const disabled = !(selectedData && selectedData.length);
        return (
        <HomeWrapper>
            <Modal
                visible={visible}
                title="tsv content"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Link to={`/orderId/${orderId}`} key={Math.random()}>
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk} disabled={disabled}>
                            Submit
                        </Button>
                    </Link>,
                ]}
            >
            {selectedData && selectedData.length ? <Table data={selectedData}/>
            : <div>
              <Input 
                placeholder="please type an order id, eg. CA-2016-152156" 
                style={{width: '40%', marginLeft:'30%', marginRight:'30%'}} 
                onChange={this.handleOnChange}
               />
               {showText && <div style={{marginTop: '10px',marginLeft:'45%', marginRight:'40%'}} ><Highliter fontWeight="normal">{'Invalid order Id'}</Highliter></div>}
            </div>
            }
        </Modal>
        </HomeWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['home', 'list']),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetList(list, orderId) {
            if (!orderId) return;
            dispatch(actionCreators.getList(orderId));
        }
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));