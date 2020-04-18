import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './valueButton.less'
import { LIGHT} from '../../constants';

function ValueButton(props) {
  const { value, visibilityMode, onChangeNumeric} = props;
  return (
    <Button
      className={`number-button-${visibilityMode === LIGHT ? 'light' : 'dark'}`}
      onClick={() => onChangeNumeric(value)}
    >
      {value}
    </Button>
  );
}

ValueButton.propTypes = {
    value: PropTypes.string,
    visibilityMode: PropTypes.string,
    onChangeNumeric: PropTypes.func,
}

export default ValueButton;