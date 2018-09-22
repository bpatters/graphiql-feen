import React, {Component, PropTypes} from "react";
import styles from "styles/components/KeyValueView.scss";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import {List, ListItem} from "material-ui/List";
import map from "lodash/map";

class KeyValueView extends Component {
	static displayName = "KeyValueView";
	static propTypes   = {
		addLabel     : PropTypes.string,
		keyLabel     : PropTypes.string,
		valueLabel   : PropTypes.string,
		keyValueMap  : PropTypes.object.isRequired,
		onDeleteKey  : PropTypes.func.isRequired,
		onAddKeyValue: PropTypes.func.isRequired
	};

	static defaultProps = {
		addLabel   : "Add",
		keyLabel   : "Name",
		valueLabel : "Value",
		keyValueMap: {},
		onDeleteKey() {
		},
		onAddKeyValue() {
		}
	};

	state = {
		key  : "",
		value: ""
	};

	onDeleteKeyPrivate = (key) => {
		return () => {
			this.props.onDeleteKey(key);
		};
	};

	onAddKeyValuePrivate = () => {
		this.props.onAddKeyValue(this.state.key, this.state.value);
		this.setState({key: "", value: ""});
	};

  selectItem = (value, key) => {
		this.setState({key, value});
	};

	renderHeaderTableRows = () => {
		return map(this.props.keyValueMap, (value, key) => {
			return (
				<ListItem key={`key-${key}`} primaryText={`${key} = ${value}`}
                  onClick={()=>this.selectItem(value, key)}
									rightIconButton={<IconButton onClick={this.onDeleteKeyPrivate(key)}><CloseIcon/></IconButton>}/>
			);
		});
	};

	renderHeaderTable = () => {
		return (
			<List>
				{this.renderHeaderTableRows()}
			</List>
		);
	};

	render() {
		return (
			<Paper zDepth={5} style={{width: "100%", height: "100%"}}>
				<div className={styles.toolbar}>
					<TextField
						floatingLabelText={this.props.keyLabel}
						floatingLabelFixed
						onChange={(event, key) => this.setState({key})}
						value={this.state.key}
					/>
					<TextField
						floatingLabelText={this.props.valueLabel}
						floatingLabelFixed
						onChange={(event, value) => this.setState({value})}
						style={{margin: "0 20px"}}
						value={this.state.value}
					/>
					<RaisedButton label={this.props.addLabel} onClick={this.onAddKeyValuePrivate} disabled={!this.state.key}/>
				</div>
				<div className={styles.headerTable}>
					{this.renderHeaderTable()}
				</div>
			</Paper>
		);
	}
}

export default KeyValueView;
