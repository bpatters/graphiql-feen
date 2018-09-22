import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import AppBar from "material-ui/AppBar";
import ExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import * as NavStateActions from "actions/NavStateActions";
import * as StateSerialization from "utils/serialization";
import {IMPORT_STATE} from "utils/importableState";
import HiddenFileDrop from "components/HiddenFileDrop";
import {updateBackgroundServer} from "actions/SettingsActions";

function mapStateToProps(state) {
	return {
		state
	};
}

class Nav extends Component {
	static displayName = "Nav";
	static propTypes   = {
		dispatch: PropTypes.func.isRequired,
		state   : PropTypes.object.isRequired
	};

	static defaultProps = {};

	state = {};

	openLeftPanel = () => {
		this.props.dispatch(NavStateActions.toggleLeftPanel());
	};

	onExport = () => {
		const message = {
			type : "DOWNLOAD",
			state: JSON.stringify(this.props.state)
		};
		/*eslint no-undef:0*/
		chrome.runtime.sendMessage(message, function () {
		});
	};

	onImport = () => {
		this.refs.import.onTriggerInput();
	};

	onImportFile = (newState) => {
		this.props.dispatch({
			type : IMPORT_STATE,
			state: StateSerialization.parseState(newState)
		});
		updateBackgroundServer(this.props.state.currentServer);
	};

  newFeatures = () => {
		this.props.dispatch({
			type : IMPORT_STATE,
			state: StateSerialization.parseState(newState)
		});
		updateBackgroundServer(this.props.state.currentServer);
	};

	onImportVersion1 = () => {
		this.refs.importVersion1.onTriggerInput();
	};

	onImportVersion1File = (newState) => {
		this.props.dispatch({
			type : IMPORT_STATE,
			state: StateSerialization.convertFromVersion1(newState)
		});
		updateBackgroundServer(this.props.state.currentServer);
	};


	onResetAll = () => {
		/*eslint no-undef:0*/
		chrome.storage.local.clear();
	};

	render() {
		return (
			<AppBar
				title="GraphIQL Feen!"
				iconElementLeft={<div/>}
				iconElementRight={
					<IconMenu
						iconButtonElement={
							<IconButton ><ExpandMoreIcon/></IconButton>
						}
						targetOrigin={{horizontal: "right", vertical: "top"}}
						anchorOrigin={{horizontal: "right", vertical: "bottom"}}
					>
						<MenuItem primaryText="Import" onClick={this.onImport}/>
						<MenuItem primaryText="Export" onClick={this.onExport}/>
						<Divider/>
						<MenuItem primaryText="Import Version1" onClick={this.onImportVersion1}/>
						<Divider/>
						<MenuItem primaryText="Erase All Data" onClick={this.onResetAll}/>
						<Divider/>
						<MenuItem primaryText="With NEW Features" onClick={this.newFeatures}/>
						<Divider/>
						<MenuItem primaryText="About"/>
					</IconMenu>
				}
			>
				<HiddenFileDrop ref="import" onChange={this.onImportFile}/>
				<HiddenFileDrop ref="importVersion1" onChange={this.onImportVersion1File}/>
			</AppBar>

		);
	}
}

export default connect(mapStateToProps)(Nav);
