import React, {Component, PropTypes} from "react";
import {connect} from 'react-redux';
import styles from 'styles/Nav.scss';
import AppBar from 'material-ui/AppBar';
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import * as NavStateActions from 'actions/NavStateActions';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import {
	shouldComponentUpdate
} from "react-immutable-render-mixin";

function mapStateToProps(state) {
	return {
	};
}

class Nav extends Component {
	static displayName = 'Nav';
	static propTypes   = {};

	static defaultProps = {};

	state = {};

	shouldComponentUpdate = shouldComponentUpdate;

	openLeftPanel = () => {
		console.log("open left panel!");
		this.props.dispatch(NavStateActions.toggleLeftPanel())
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
						targetOrigin={{horizontal: 'right', vertical: 'top'}}
						anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
					>
						<MenuItem primaryText="Export"/>
						<Divider/>
						<MenuItem primaryText="About"/>
					</IconMenu>}
			/>
		)
	}
}

export default connect(mapStateToProps)(Nav);
