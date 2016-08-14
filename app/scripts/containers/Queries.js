import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import styles from "styles/Queries.scss";
import {List, ListItem} from "material-ui/List";
import Subheader from "material-ui/Subheader";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as QueryActions from "actions/QueryActions";
import ActionInfo from "material-ui/svg-icons/action/delete-forever";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import Immutable from "immutable";
import QueryRecord from "scripts/records/QueryRecord";


import {
	shouldComponentUpdate
} from "react-immutable-render-mixin";


function mapStateToProps(state) {
	return {
		currentQuery: state.queries.currentQuery,
		queries     : state.queries.queries
	};
}

class Queries extends Component {
	static displayName = "Queries";
	static propTypes   = {
		onClose     : PropTypes.func,
		dispatch    : PropTypes.func,
		queries     : PropTypes.instanceOf(Immutable.List),
		currentQuery: PropTypes.instanceOf(QueryRecord)
	};

	static defaultProps = {};

	shouldComponentUpdate = shouldComponentUpdate;

	onQueryDelete = (index) => {

		return () => {
			this.props.dispatch(QueryActions.deleteQuery(index));
		};
	};
	onQuerySelect = (index) => {

		return () => {
			this.props.dispatch(QueryActions.updateCurrentQuery(this.props.queries.get(index).toObject()));
		};
	};

	renderQueries = () => {
		return this.props.queries.map((query, index) => {
			return (
				<ListItem
					key={index}
					primaryText={query.name}
					onClick={this.onQuerySelect(index)}
					rightIcon={<ActionInfo onClick={this.onQueryDelete(index)}/>}
				/>
			);
		});
	};

	onQueryNameChange = (event, value) => {
		this.props.dispatch(QueryActions.updateCurrentQuery({name: value}));
	};

	saveQuery = () => {
		const index = this.queryWithNameIndex();

		const action = () => {
			this.props.dispatch(QueryActions.saveCurrentQuery());
			this.props.dispatch(QueryActions.updateCurrentQuery({name: ""}));
		};
		if (typeof index === "undefined") {
			action();
		} else {
			this.props.dispatch(QueryActions.deleteQuery(index));
			action();
		}
	};

	queryWithNameIndex = () => {
		return this.props.queries.findKey((query) => {
			return query.name === this.props.currentQuery.name;
		});
	};

	queryWithNameExists() {
		return !(typeof this.queryWithNameIndex() === "undefined");
	}

	render() {
		return (
			<List>
				<div className={styles.closeBox}>
					<CloseIcon onClick={this.props.onClose}/>
				</div>
				<div className={styles.saveBox}>
					<TextField
						floatingLabelText="Query Name"
						floatingLabelFixed
						onChange={this.onQueryNameChange}
						value={this.props.currentQuery.name}
						fullWidth
					/>
					<div style={{alignSelf: "center", margin: "15px 0 0 10px"}}>
						<RaisedButton
							label={this.queryWithNameExists() ? "Update" : "Save"}
							onClick={this.saveQuery}
							disabled={!this.props.currentQuery.name}/>
					</div>
				</div>
				<Subheader> Saved Queries </Subheader>
				{this.renderQueries()}
				<Divider/>
			</List>

		);
	}
}

export default connect(mapStateToProps)(Queries);
