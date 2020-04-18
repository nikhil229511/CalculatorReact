import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './operationButton.less'
import { LIGHT } from '../../constants';

function OperationButton(props) {
  const { value, visibilityMode, onChangeOperator } = props;
  return (
    <Button 
      className={`operation-button-${visibilityMode === LIGHT ? 'light' : 'dark'}`}
      onClick={() => onChangeOperator(value)}
    >
      {value}
    </Button>
  );
}

OperationButton.propTypes = {
    value: PropTypes.string,
    visibilityMode: PropTypes.string,
    onChangeOperator: PropTypes.func,
}

export default OperationButton;