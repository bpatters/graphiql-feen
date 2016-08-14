import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";


class HiddenFileDrop extends Component {
	static displayName = "HiddenFileDrop";
	static propTypes   = {
		placeHolderText: PropTypes.string,
		onChange       : PropTypes.func
	};

	static defaultProps = {
		onChange() {
		}
	};


	onTriggerInput = () => {
		ReactDOM.findDOMNode(this.refs._fileInput).click();
	};

	onChange = () => {
		if (this.refs._fileInput.files && this.refs._fileInput.files[0]) {
			const reader    = new FileReader();
			reader.onload = (e) => {
				this.props.onChange(e.target.result);
				// set input to null so same file can be selected again
				this.refs._fileInput.value = null;
			};
			reader.readAsText(this.refs._fileInput.files[0]);
		}
	};

	renderInput = () => {
		return (
			<input type="file"
						 onChange={this.onChange} ref="_fileInput"
						 style={{position: "absolute", top: "-99999px"}}/>
		);
	};

	render() {
		return (this.renderInput());
	}
}

export default HiddenFileDrop;
