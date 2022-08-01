import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 5,
      userNumber: '',
      randomNumber: this.getRandomNumber(),
      count: 0,
      inProgress: true,
      result: `Введите число`,
    };
  }

  getRandomNumber = () => (
    Math.floor(Math.random() * this.props.max -
    this.props.min) + this.props.min
  );

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      count: this.state.count + 1,
    });

    this.setState(state => {
      console.log('state.randomNumber: ', state.randomNumber);

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
        inProgress: false,
        result: `Вы угадали, загаданное число ${state.userNumber},
          попыток ${state.count}`,
      };
    });

    this.setState((state, props) => ({
      userNumber: '',
    }));
  };

  handleChange = e => {
    this.setState((state, props) => ({
      userNumber: e.target.value,
    }));

    setTimeout(() => {
      console.log(this.state);
    }, 0);
  };

  playMore = () => {
    this.setState({
      result: `Введите число`,
      inProgress: true,
      count: 0,
      randomNumber: this.getRandomNumber(),
    });
  };

  renderPhase = () => {
    if (this.state.inProgress) {
      return (
        <div className="game__progress">
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

    return (
      <div className={style.game__start}>
        <button className={style.btn} onClick={this.playMore}>
          Сыграть еще
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        {this.renderPhase()}
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
