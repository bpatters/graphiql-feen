import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import styles from 'styles/Settings.scss';
import AutoComplete from 'material-ui/AutoComplete';
import * as SettingsActions from 'actions/SettingsActions'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

import {
	shouldComponentUpdate
} from "react-immutable-render-mixin";

function mapStateToProps(state) {
	return {
		settings     : state.settings,
		currentServer: state.settings.currentServer
	};
}

class Settings extends Component {
	static displayName = 'Settings';
	static propTypes   = {};

	static defaultProps = {};

//	shouldComponentUpdate = shouldComponentUpdate;


	urlDataSource = () => {
		return this.props.settings.servers.map(server => {
			return server.url;
		}).toArray();
	};

	onUpdateInput = (value) => {
		this.props.dispatch(SettingsActions.saveServerUrl(value));
	};

	onHeaderChange = (index) => {

	};

	renderHeaderTableRows = () => {
		return this.props.currentServer.headers.map((value, key) => {
			return (
				<ListItem key={`key-${key}`} primaryText={key} secondaryText={value}
									secondaryTextLines={2}
									rightIconButton={<IconButton><CloseIcon onClick={this.props.onClose}/></IconButton>}/>
			)
		}).toArray();
	};

	renderHeaderTable = () => {
		return (
			<List>
				{this.renderHeaderTableRows()}
			</List>
		);
	};

	addHeader = () => {
		this.props.dispatch(SettingsActions.addServerHeader({[this.state.name]: this.state.value}))
	};

	render() {
		return (
			<div className={styles.settings}>
				<AutoComplete
					floatingLabelText="Server Url"
					dataSource={this.urlDataSource()}
					onUpdateInput={this.onUpdateInput}
					fullWidth={true}>
				</AutoComplete>

				<div className={styles.headers}>
					<Paper zDepth={5}>
						<div className={styles.toolbar}>
							<TextField
								floatingLabelText="Header Name"
								floatingLabelFixed={true}
								onChange={(event, name) => this.setState({name})}
							/>
							<TextField
								floatingLabelText="Header Value"
								floatingLabelFixed={true}
								onChange={(event,value) => this.setState({value})}
								style={{margin: "0 20px"}}
							/>
							<RaisedButton label="Add Header" onClick={this.addHeader}/>
						</div>
						<div className={styles.headerTable}>
							{this.renderHeaderTable()}
						</div>
					</Paper>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Settings);
