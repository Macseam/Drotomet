import React, { Component } from 'react';

export default class ScorePageAsync extends Component {

  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    require.ensure([], (require) => {
      const Component = require('./ScorePage').default;
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
