import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import styles from "styles/Main.scss";
import GraphiQL from "graphiql";
import Nav from "containers/Nav";
import * as QueryActions from "actions/QueryActions";
import Queries from "containers/Queries";
import {Tabs, Tab} from "material-ui/Tabs";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import * as NavStateActions from "actions/NavStateActions";
import IconButton from "material-ui/IconButton";
import Settings from "containers/Settings";
import ServerRecord from "records/ServerRecord";

import {
	shouldComponentUpdate
} from "react-immutable-render-mixin";

function mapStateToProps(state) {
	return {
		query        : state.queries.currentQuery.query,
		variables    : state.queries.currentQuery.variables,
		leftPanelOpen: state.navstate.leftPanelOpen,
		currentServer: state.settings.currentServer
	};
}

class Main extends Component {
	static displayName = "Main";
	static propTypes   = {
		dispatch     : PropTypes.func.isRequired,
		query        : PropTypes.string,
		variables    : PropTypes.string,
		leftPanelOpen: PropTypes.bool.isRequired,
		currentServer: PropTypes.instanceOf(ServerRecord)
	};

	static defaultProps = {};

	shouldComponentUpdate = shouldComponentUpdate;

	graphQLFetcher = (data) => {
		const formData = new FormData();
		formData.append("query", data.query);
		formData.append("variables", data.variables);

		return fetch(this.props.currentServer.url, {
			method     : "post",
			credentials: "include",
			headers    : this.props.currentServer.headers.toObject(),
			body       : formData
		}).then((res) => {
			if (res.status === 200) {
				return res.json().then((json) => {
					return json;
				});
			}
			return res;
		});
	};

	onQueryChange     = (query) => {
		this.props.dispatch(QueryActions.updateCurrentQuery({query}));
	};
	onVariablesChange = (variables) => {
		this.props.dispatch(QueryActions.updateCurrentQuery({variables}));
	};
	toggleLeftPanel   = () => {
		this.props.dispatch(NavStateActions.toggleLeftPanel());
	};

	renderGraphIQL = () => {
		return (
			<GraphiQL style={{display: "flex", flexGrow: 99}}
								query={this.props.query}
								variables={this.props.variables}
								onEditQuery={this.onQueryChange}
								onEditVariables={this.onVariablesChange}
								fetcher={this.graphQLFetcher}/>
		);
	};

	renderSidePanel = () => {
		if (this.props.leftPanelOpen) {
			return (
				<div className={styles.leftSidePanel}>
					<Queries onClose={this.toggleLeftPanel}/>
				</div>
			);
		}
		return (
			<IconButton onClick={this.toggleLeftPanel}>
				<MenuIcon/>
			</IconButton>
		);
	};

	render() {
		return (
			<div className={styles.main}>
				<Nav/>
				<div className={styles.mainView}>
					<Tabs style={{width: "100%"}}>
						<Tab label="Queries">
							<div className={styles.queries}>
								{this.renderSidePanel()}
								{this.renderGraphIQL()}
							</div>
						</Tab>
						<Tab label="Settings">
							<Settings/>
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Main);
