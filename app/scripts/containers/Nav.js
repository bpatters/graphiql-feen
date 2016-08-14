import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import AppBar from "material-ui/AppBar";
import ExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import * as NavStateActions from "actions/NavStateActions";
import * as StateSerialization from "scripts/utils/serialization";
import {IMPORT_STATE} from "scripts/utils/importableState";
import HiddenFileDrop from "components/HiddenFileDrop";

import {
	shouldComponentUpdate
} from "react-immutable-render-mixin";

function mapStateToProps(state) {
	return {
		state
	};
}

class Nav extends Component {
	static displayName = "Nav";
	static propTypes   = {
		dispatch : PropTypes.func.isRequired,
		state : PropTypes.object.isRequired
	};

	static defaultProps = {};

	state = {};

	shouldComponentUpdate = shouldComponentUpdate;

	openLeftPanel = () => {
		this.props.dispatch(NavStateActions.toggleLeftPanel());
	};

	onExport = () => {
		const message = {state: StateSerialization.stateToJSON(this.props.state)};
		/*eslint no-undef:0*/
		chrome.runtime.sendMessage(message, function() {
		});
	};

	onImport = () => {
		this.refs.fileDrop.onTriggerInput();
	};

	onImportFile = (newState) => {
		this.props.dispatch({
			type: IMPORT_STATE,
			state: StateSerialization.stateFromJSON(newState)
		});
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
						<MenuItem primaryText="About"/>
					</IconMenu>}
			>
				<HiddenFileDrop ref="fileDrop" onChange={this.onImportFile}/>
			</AppBar>

		);
	}
}

export default connect(mapStateToProps)(Nav);
