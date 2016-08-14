import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import styles from 'styles/Settings.scss';
import AutoComplete from 'material-ui/AutoComplete';
import * as SettingsActions from 'actions/SettingsActions'
import {List, ListItem} from 'material-ui/List';
import KeyValueView from "components/KeyValueView"

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

	shouldComponentUpdate = shouldComponentUpdate;

	urlDataSource = () => {
		return this.props.settings.servers.map(server => {
			return server.url;
		}).toArray();
	};

	onUpdateInput = (value) => {
		this.props.dispatch(SettingsActions.saveServerUrl(value));
	};

	addHeader = (key, value) => {
		this.props.dispatch(SettingsActions.addServerHeader({[key]: value}))
	};

	onDeleteHeader = (key) => {
		this.props.dispatch(SettingsActions.deleteServerHeader(key));
	};
	addCookie = (key, value) => {
		this.props.dispatch(SettingsActions.addServerCookie({[key]: value}))
	};

	onDeleteCookie = (key) => {
		this.props.dispatch(SettingsActions.deleteServerCookie(key));
	};


	render() {
		return (
			<div className={styles.settings}>
				<AutoComplete
					floatingLabelText="Server Url"
					dataSource={this.urlDataSource()}
					onUpdateInput={this.onUpdateInput}
					fullWidth={true}
					searchText={this.props.currentServer.url}>
				</AutoComplete>

				<div className={styles.tables}>
					<KeyValueView
						addLabel="Add Header"
						keyLabel="Header Name"
						valueLabel="Header Value"
						keyValueMap={this.props.currentServer.headers.toObject()}
						onDeleteKey={this.onDeleteHeader}
						onAddKeyValue={this.addHeader}
					/>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Settings);
