import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import styles from "styles/Settings.scss";
import AutoComplete from "material-ui/AutoComplete";
import * as SettingsActions from "actions/SettingsActions";
import KeyValueView from "components/KeyValueView";
import RaisedButton from "material-ui/RaisedButton";
import Immutable from "immutable";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import {GET, POST, MULTIPART} from "scripts/records/ServerRecord";

import {
	shouldComponentUpdate
} from "react-immutable-render-mixin";

function mapStateToProps(state) {
	return {
		settings     : state.settings,
		currentServer: state.settings.currentServer,
		servers      : state.settings.servers
	};
}

class Settings extends Component {
	static displayName = "Settings";

	static propTypes    = {
		settings     : PropTypes.object.isRequired,
		dispatch     : PropTypes.func.isRequired,
		currentServer: PropTypes.object.isRequired,
		servers      : PropTypes.instanceOf(Immutable.List)
	};
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
		this.props.dispatch(SettingsActions.addServerHeader({[key]: value}));
	};

	onDeleteHeader = (key) => {
		this.props.dispatch(SettingsActions.deleteServerHeader(key));
	};
	addCookie      = (key, value) => {
		this.props.dispatch(SettingsActions.addServerCookie({[key]: value}));
	};

	onDeleteCookie = (key) => {
		this.props.dispatch(SettingsActions.deleteServerCookie(key));
	};

	onSaveServer = () => {
		this.props.dispatch(SettingsActions.saveCurrentServer());
	};

	onServerSelected = (chosenRequest, index) => {
		let serverIndex = index;

		if (chosenRequest) {
			serverIndex = this.props.servers.findKey((server) => {
				return server.url === chosenRequest;
			});
		}

		if (serverIndex > 0 && serverIndex < this.props.servers.size) {
			this.props.dispatch(SettingsActions.selectServer(this.props.servers.get(serverIndex)));
		}
	};

	onMethodChange = (event, index, value) => {
		this.props.dispatch(SettingsActions.setServerMethod(value));
	};

	render() {
		return (
			<div className={styles.settings}>
				<div className={styles.serverDef}>
					<DropDownMenu
						className={styles.serverMethod}
						value={this.props.currentServer.method}
						onChange={this.onMethodChange}>
						<MenuItem value={GET} primaryText={GET}/>
						<MenuItem value={POST} primaryText={POST}/>
						<MenuItem value={MULTIPART} primaryText={MULTIPART}/>
					</DropDownMenu>
					<AutoComplete className={styles.serverUrl}
						floatingLabelText="Server Url"
						dataSource={this.urlDataSource()}
						onUpdateInput={this.onUpdateInput}
						fullWidth
						onNewRequest={this.onServerSelected}
						searchText={this.props.currentServer.url}/>
					<div style={{display: "none", alignSelf: "center", margin: "15px 0 0 10px"}}>
						<RaisedButton label="Save" onClick={this.onSaveServer}/>
					</div>
				</div>

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
		);
	}
}

export default connect(mapStateToProps)(Settings);
