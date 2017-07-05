import React, { Component } from 'react';

export default class NotFoundAsync extends Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    require.ensure([], (require) => {
      const Component = require('./NotFound').default;
      this.setState({
        component: Component
      });
    });
  }

  render() {

    if (this.state.component) {
      return <this.state.component/>
    }
    return (<div>Loading</div>);
  }
}
