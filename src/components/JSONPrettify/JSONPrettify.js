import React from 'react';
import css from './JSONPrettify.module.scss'

class JSONPrettify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //Root node open
      Object: props.root === undefined
    }
  }

  renderRow(key, value, i) {
    const type = typeof(value);
    const isObject = type === 'object';
    const isArray = Array.isArray(value);

    const tplForObject =
      <>
        <button className={`${css.withChildren}`}
                onClick={() => this.toggleRow(key)}
        >
          <span className={`mr-1 ${css.key}`}>{key}:</span>
          <span className={css[type]}>{isArray ? `Array[${value.length}]`:'Object'}</span>
        </button>

        {this.state[key] && <JSONPrettify data={value} root={false} />}
      </>;

    const tplForOtherTypes =
      <>
        <span className={`mr-1 ${css.key}`}>{key}:</span>
        <span className={css[type]}>{type === 'string' ? `"${value}"` : value.toString()}</span>
      </>;

    return (
      <div className={`ml-3 ${css.PrettifyRow} ${this.state[key] ? css.open: ''}`}
           key={i}
      >
        {isObject ? tplForObject : tplForOtherTypes}
      </div>
    )
  }

  toggleRow(key = 'root'){
    this.setState({[key]: !this.state[key]});
  }

  render() {
    let data = this.props.data;
    const isRoot = this.props.root !== undefined ? this.props.root : true;

    if (isRoot) {
      data = {'Object' : data}
    }

    return (
      <>
        {Object.keys(data).map((key, i) => (
          this.renderRow(key, data[key], i)
        ))}
      </>
    );
  }
}

export default JSONPrettify;
