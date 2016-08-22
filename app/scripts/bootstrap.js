import "styles/normalize.scss";
import "styles/reboot.scss";

import React, { Component, PropTypes } from "react";
import { Provider } from "react-redux";
import Main from "containers/Main";

export default class Root extends Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	};

	render() {
		const { store } = this.props;
		return (
			<Provider store={store}>
				<Main/>
			</Provider>
		);
	}
}


