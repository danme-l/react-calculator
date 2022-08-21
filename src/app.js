import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calc: "",
        }
        this.updateCalc = this.updateCalc.bind(this);
        this.calculate = this.calculate.bind(this);
        this.backspace = this.backspace.bind(this);
        this.clear = this.clear.bind(this);
    }

    updateCalc = (value) => {
        const operRegex = /[+\-*/]/;
        if (this.state.calc === "" && value === "0") {
            return;
        }
        if (value === ".") {
            const parts = this.state.calc.split(operRegex);
            if (parts[parts.length -1].includes('.')) {
                return;
            }
        }
        if (value !== '-' && operRegex.test(value)) {
            const lastChar = this.state.calc[this.state.calc.length - 1] || "";
            const secondLastChar = this.state.calc[this.state.calc.length -2] || "";
            if (operRegex.test(lastChar)) {
                if (lastChar === "-" && operRegex.test(secondLastChar)){
                    this.setState({
                        calc: this.state.calc.slice(0,-2) + value,
                    });
                    return;
                }
                this.setState({
                    calc: this.state.calc.slice(0,-1) + value,
                });
                return;
            }
        }
        this.setState({
            calc: this.state.calc + value,
        })
    };

    calculate = () => {
        this.setState({
            // I know eval() shouldn't be used 
            // eslint-disable-next-line
            calc: eval(this.state.calc).toString(),
        });
    };

    backspace = () => {
        if (this.state.calc === "") {
            return;
        }

        const value = this.state.calc.slice(0,-1);
        this.setState({
            calc: value,
        })
    };

    clear = () => {
        this.setState({
            calc: "",
        })
    }

    render() {
        return (
            <div id="wrapper">
                <h1>Simple Calculator App</h1>
                <div className="calculator">
                    <Display calc={this.state.calc} />
                    <div id="buttonsContainer">
                        <div id="numbersContainer">
                            <button id="one" className="btn number-button" onClick={() => {this.updateCalc("1")}}>1</button>
                            <button id="two" className="btn number-button" onClick={() => {this.updateCalc("2")}}>2</button>
                            <button id="three" className="btn number-button" onClick={() => {this.updateCalc("3")}}>3</button>
                            <button id="four" className="btn number-button" onClick={() => {this.updateCalc("4")}}>4</button>
                            <button id="five" className="btn number-button" onClick={() => {this.updateCalc("5")}}>5</button>
                            <button id="six" className="btn number-button" onClick={() => {this.updateCalc("6")}}>6</button>
                            <button id="seven" className="btn number-button" onClick={() => {this.updateCalc("7")}}>7</button>
                            <button id="eight" className="btn number-button" onClick={() => {this.updateCalc("8")}}>8</button>
                            <button id="nine" className="btn number-button" onClick={() => {this.updateCalc("9")}}>9</button>
                            <button id="zero" className="btn number-button" onClick={() => {this.updateCalc("0")}}>0</button>
                            <button id="decimal" className="btn" onClick={() => {this.updateCalc(".")}}>.</button>
                            <button id="del" className="btn" onClick={this.backspace}>DEL</button>
                        </div>
                        <div id="operationsContainer">
                            <button id="add" className="btn" onClick={() => {this.updateCalc("+")}}>+</button>
                            <button id="subtract" className="btn" onClick={() => {this.updateCalc("-")}}>-</button>
                            <button id="multiply" className="btn" onClick={() => {this.updateCalc("*")}}>*</button>
                            <button id="divide" className="btn" onClick={() => {this.updateCalc("/")}}>/</button>
                            <button id="equals" className="btn" onClick={this.calculate}>=</button>
                            <button id="clear" className="btn" onClick={this.clear}>AC</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Display(props) {
  return (
    <div className="display" id="display">
      {props.calc || "0"}
    </div>
  )
}

export default Calculator;