import React from 'react';

class ORDynamicCode extends React.Component {

	constructor(props) {
		super(props);
		this._target_id = this.props.id;
		this.state = {
			value: this.props.initialValue,
			clicked: false
		};
	}

	applyValueToAll(id, value) {
		document.querySelectorAll(`[id=${id}]`).forEach(el => {
			el.value = value;
			el.textContent = value;
		});
	}

	handleChange = (event) => {
		event.stopPropagation();
		this.setState({value: event.target.value});
		this.applyValueToAll(this._target_id, event.target.value);
	}

	handleClick = (event) => {
		event.stopPropagation();
		this.setState({clicked: true});
		const el = document.getElementById(this._target_id);
		if (el && el.value) {
			this.setState({value: el.value});
		}
	}
	handleBlur = (event) => {
		event.stopPropagation();
		if (this.state.clicked) {
			if (this.state.value.length === 0) {
				this.setState({value: this.props.initialValue});
				this.applyValueToAll(this._target_id, this.props.initialValue);
			}
			this.setState({clicked: false});
		}
	}
	handleKey = (event) => {
		//to capture escape and enter
		if (event.keyCode === 27 || event.keyCode === 13) {
			event.stopPropagation();
			if (this.state.clicked) {
				if (this.state.value.length === 0) {
					this.setState({value: this.props.initialValue});
					this.applyValueToAll(this._target_id, this.props.initialValue);
				}
				this.setState({clicked: false});
			}
		}
	}

	render() {
		return (
			this.state.clicked ?
				<input id={this._target_id} onChange={this.handleChange}
							 value={this.state.value} onKeyDown={this.handleKey} autoFocus onBlur={this.handleBlur}/> :
				<code id={this._target_id} style={{padding: 0, border: "1px dashed"}} onDoubleClick={this.handleClick}
							title="double click to change" data-tooltip-interactive="false">{this.state.value}</code>
		);
	}

}

export default ORDynamicCode;
