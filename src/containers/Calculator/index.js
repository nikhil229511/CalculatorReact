import React, { Component } from 'react';
import { Input, Row, Col, Button } from 'antd';
import './calculator.less';
import ValueButton from '../../components/ValueButton';
import OperationButton from '../../components/OpertaionButton';
import {
  LIGHT,
  DARK,
  ABSOLUTE,
  SQUARE,
  SQROOT
} from '../../constants';
import { calculateResult } from '../../utils/calculations';

export class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  
  initialState = () => {
    return {
      visibilityMode: LIGHT,
      showScientific: false,
      calculationStack: [],
      currentOperation: null,
      currentValue: '',
      showResult: true,
      finalValue: 0,
    }
  };

  changeVisibility = (visibilityMode) => {
    this.setState({ visibilityMode });
  };

  changeScientificVisibility = (visibility) => {
    this.setState({ showScientific: visibility});
  };

  onChangeNumeric = (num) => {
    this.setState(prevState => ({ showResult: false, currentValue: prevState.currentValue + num}));
  };

  
  onChangeOperator = (currentOp) => {
    const { currentOperation, currentValue, calculationStack } = this.state;
    const stack = calculationStack;
    let val1, val2, result;

    if (!currentOperation) {
      stack.push(currentValue);
      this.setState({
          calculationStack: stack,
          currentOperation: currentOp,
          currentValue: '',
          finalValue: currentValue,
          showResult: true,
      });
    } else {
        val1 = currentValue;
        val2 = stack.pop();
        result = calculateResult(val2, val1, currentOperation);
        stack.push(result);
        this.setState({
          calculationStack: stack,
          currentOperation: currentOp,
          currentValue: '',
          finalValue: result,
          showResult: true,
        });
    }
  };

  onChangeScientificOperator = (currentOp) => {
    const { calculationStack, currentOperation, currentValue } = this.state;
    const stack = calculationStack;
    let val1, val2, result;
    if (!currentOperation) {
      result = calculateResult(currentValue, val1, currentOp);
      this.setState({
        calculationStack: [result],
        currentOperation: '=',
        currentValue: result,
        finalValue: result,
        showResult: true,
    });
    } else {
      val2 = stack.pop();
      result = calculateResult(val2, val1, currentOp);
      stack.push(result);
      this.setState({
        calculationStack: stack,
        currentOperation: '=',
        currentValue: '',
        finalValue: result,
        showResult: true,
      });
    }
  };

  render() {
    const { visibilityMode, showScientific, currentValue, showResult, finalValue } =this.state;
    return (
      <div className="calculator-container" style={{backgroundColor: visibilityMode === DARK ? '#000' : '#fff'}}>
        <div className="result-container">
          <Input value={showResult ? finalValue : currentValue} className={`result-${visibilityMode === LIGHT ? 'light' : 'dark'}`}/>
        </div>
        <div className="buttons-container">
          <Row>
            <Col span={6}><ValueButton value={1} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}><ValueButton value={2} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}><ValueButton value={3} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}>
              <OperationButton value={'+'} onChangeOperator={this.onChangeOperator} visibilityMode={visibilityMode}/>
            </Col>
          </Row>
          <Row>
            <Col span={6}><ValueButton value={4} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}><ValueButton value={5} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}><ValueButton value={6} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}>
              <OperationButton value={'-'} onChangeOperator={this.onChangeOperator} visibilityMode={visibilityMode}/>
            </Col>
          </Row>
          <Row>
            <Col span={6}><ValueButton value={7} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}><ValueButton value={8} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}><ValueButton value={9} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}>
              <OperationButton value={'*'} onChangeOperator={this.onChangeOperator} visibilityMode={visibilityMode}/>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Button 
                className={`clear-button-${visibilityMode === LIGHT ? 'light' : 'dark'}`}
                onClick = {() => this.setState(this.initialState())}
              >
                Clear
              </Button>
            </Col>
            <Col span={6}><ValueButton value={0} onChangeNumeric={this.onChangeNumeric} visibilityMode={visibilityMode}/></Col>
            <Col span={6}><OperationButton value={'='} onChangeOperator={this.onChangeOperator} visibilityMode={visibilityMode}/></Col>
            <Col span={6}>
              <OperationButton value={'/'} onChangeOperator={this.onChangeOperator} visibilityMode={visibilityMode}/>
            </Col>
          </Row>
        </div>
        <div 
          className='scientific-container'
          style={{visibility: `${showScientific ? 'unset' : 'hidden'}`}}
        >
          <Row>
            <Col span={8}>
              <OperationButton
                value={'+/-'}
                visibilityMode={visibilityMode}
                operation={ABSOLUTE}
                onChangeOperator={this.onChangeScientificOperator}
              />
            </Col>
            <Col span={8}>
              <OperationButton
                value={'Square'}
                visibilityMode={visibilityMode}
                operation={SQUARE}
                onChangeOperator={this.onChangeScientificOperator}
              />
            </Col>
            <Col span={8}>
              <OperationButton
                value={'Square Root'}
                visibilityMode={visibilityMode}
                operation={SQROOT}
                onChangeOperator={this.onChangeScientificOperator}
              /></Col>
          </Row>
        </div>
        <div className="extra-functionalities-container">
          <Row>
            <Col span={8}>
              <Button 
                className={`action-button-${visibilityMode === LIGHT ? 'light' : 'dark'}`}
                onClick = {() => this.changeScientificVisibility(!showScientific)}
              >
                {`${showScientific ? 'Hide' : 'Show'} Scientific`}
              </Button>
            </Col>
            <Col span={8}>
              <Button
                className={`action-button-${visibilityMode === LIGHT ? 'light' : 'dark'}`}
                onClick={() => this.changeVisibility(LIGHT)}
              >
                Light Theme
              </Button>
            </Col>
            <Col span={8}>
              <Button
                className={`action-button-${visibilityMode === LIGHT ? 'light' : 'dark'}`}
                onClick={() => this.changeVisibility(DARK)}
              >
                Dark Theme
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
  
  export default Calculator;