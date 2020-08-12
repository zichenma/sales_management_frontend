import React, { PureComponent } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import  { actionCreators } from './store';
import { Modal, Button, Card, Input, List } from 'antd';
import Highliter from '../../common/highlighter';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { PARSING_DATA_ERROR } from '../../utils/constants'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'antd/dist/antd.css';
import { DetailWrapper } from './style';



class Detail extends PureComponent {
  timerState = null;
  constructor(props){
      super(props)
      this.state = {
          loading: false,
          visible: true,
          copied: false,    
      }
  }

  componentDidMount() {
    const { handleGetList, list, id } = this.props;
    handleGetList(list, id);
  }

  componentWillUnmount() {
    clearTimeout(this.timerState);
  }


  handleOk = () => {
      navigator.clipboard.writeText(window.location.href);
      this.setState({copied : true})
  };

  handleCancel = () => {
      this.setState({ visible: false });
  };

  render () {
      const { list,  errors } = this.props;
      const { visible, loading, copied } = this.state;
      const dataList = list.toJS();
      const errorList = errors.toJS();
    return (
      <DetailWrapper>
        <Modal
            visible={visible}
            title="results"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Input
              key={Math.random()}
              placeholder="Order Url"
              style={{width : '50%', marginRight: '3%'}}
              value ={window.location.href}
              disabled
              /> ,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                {copied ? <span>Copied!</span> : <span>Copy Link</span>}
              </Button>,
            ]} 
            > 
              <Card style={{ width: '100%' }}>
                 {
                   dataList.map((list, idx) => {
                     return (
                      <SyntaxHighlighter language="javascript" key={Math.random() + idx} style={docco}>
                          {JSON.stringify(list, undefined, 4)}
                      </SyntaxHighlighter>
                     )
                   })
                 }
              </Card>
              <Card 
                  style={{ width: '100%', marginTop : 20 }}
                  title="errors"
              >
              {errorList.length ? <List
                  size="small"
                  bordered
                  dataSource={errorList}
                  renderItem={
                    item => {
                      return(
                        <List.Item key={Math.random()}>
                          {item.name}: {item.message} at row <Highliter>{item.row}</Highliter> in tsv file,
                           please check accordingly.
                        </List.Item>
                      )
                    }
                  }
                /> :
                !dataList.length && <p><Highliter fontWeight={'nomal'}>{ PARSING_DATA_ERROR }</Highliter></p>
              }
              </Card>
        </Modal>
      </DetailWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const orderId = ownProps.match.params.order_id;
  return {
      id: orderId,
      list: state.getIn(['detail', 'list']),
      errors: state.getIn(['detail', 'errors']) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleGetList(list, orderId) {
          if (!orderId) return;
          dispatch(actionCreators.getList(orderId));
          dispatch(actionCreators.getErrors(orderId));
      },
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));