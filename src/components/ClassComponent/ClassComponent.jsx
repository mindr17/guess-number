import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 5,
      userNumber: '',
      randomNumber:
        Math.floor(Math.random() *
        this.props.max -
        this.props.min) +
        this.props.min,
      count: 0,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('e.target: ', e.target);

    this.setState({
      count: this.state.count,
    });

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: `Введите число`,
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber},
          попыток ${state.count}`,
      };
    });
  };

  handleChange = e => {
    this.setState((state, props) => ({
      userNumber: e.target.value,
    }));

    setTimeout(() => {
      console.log(this.state);
    }, 0);
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.number}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number'
            id='user_number'
            onChange={this.handleChange}
            value={this.state.userNumber}
          />

          <button className={style.btn}>Угадать</button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
