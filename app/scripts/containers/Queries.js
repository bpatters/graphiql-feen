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
import findIndex from "lodash/findIndex";

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
		queries     : PropTypes.array,
		currentQuery: PropTypes.object
	};

	static defaultProps = {};

	onQueryDelete = (index) => {

		return (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.props.dispatch(QueryActions.deleteQuery(index));
			this.props.dispatch(QueryActions.updateCurrentQuery({name: ""}));
		};
	};
	onQuerySelect = (index) => {

		return () => {
			this.props.dispatch(QueryActions.updateCurrentQuery(this.props.queries[index]));
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

		if (index === -1) {
			this.props.dispatch(QueryActions.saveCurrentQuery());
		} else {
			this.props.dispatch(QueryActions.updateQuery());
		}
	};

	queryWithNameIndex = () => {
		return findIndex(this.props.queries, (query) => {
			return query.name === this.props.currentQuery.name;
		});
	};

	queryWithNameExists() {
		return !(this.queryWithNameIndex() === -1);
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
