import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import styles from "styles/Settings.scss";
import AutoComplete from "material-ui/AutoComplete";
import * as SettingsActions from "actions/SettingsActions";
import KeyValueView from "components/KeyValueView";
import RaisedButton from "material-ui/RaisedButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import {GET, POST, MULTIPART} from "model/ServerRecord";
import map from "lodash/map";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import Paper from "material-ui/Paper";

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
		servers      : PropTypes.object
	};
	static defaultProps = {};


	urlDataSource = () => {
		return map(this.props.settings.servers, server => {
			return {text: server.url, value: server};
		});
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

	onDeleteServer = (val) => {
		this.props.dispatch(SettingsActions.deleteCurrentServer(val));
	};

	onServerSelected = (chosenRequest) => {
		if (this.props.servers[chosenRequest.text]) {
			this.props.dispatch(SettingsActions.selectServer(this.props.servers[chosenRequest.text]));
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
												openOnFocus
												onNewRequest={this.onServerSelected}
												searchText={this.props.currentServer.url}/>
					<div style={{alignSelf: "center", margin: "15px 0 0 10px"}}>
						<RaisedButton label="Save" onClick={this.onSaveServer}/>
					</div>
				</div>

				<div className={styles.tables}>

          <Paper style={{width: "100%", padding: "10px", marginBottom: "10px"}}>
            <h4>Servers History:</h4>
            <div style={{display: "flex", flexWrap: "wrap"}}>
              {map(this.props.servers, (server, index) => {
                return (<Chip
                  key={server.url}
                  style={{marginRight: "5px"}}
                  onClick={()=> this.onServerSelected({text: server.url, value: server})}
                  onRequestDelete={() => this.onDeleteServer(index)}>
                  <Avatar size={32}>{server.method.charAt(0).toUpperCase()}</Avatar>
                  {server.url}
                </Chip>);
              }
            )}
            </div>
          </Paper>
					<KeyValueView
						addLabel="Add Header"
						keyLabel="Header Name"
						valueLabel="Header Value"
						keyValueMap={this.props.currentServer.headers}
						onDeleteKey={this.onDeleteHeader}
						onAddKeyValue={this.addHeader}
					/>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Settings);
