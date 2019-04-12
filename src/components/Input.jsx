import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dirty: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { resetChild, resetFinished } = nextProps;
    if (resetChild) {
      this.setState({
        dirty: false,
      });
      resetFinished();
    }
  }

  onChange({ target: { value } }) {
    const { onDataChange } = this.props;

    this.setState({
      dirty: true,
    });

    onDataChange(value);
  }

  render() {
    const {
      label,
      value = '',
      validate,
      validationMessage,
      formDirty,
    } = this.props;

    const {
      dirty,
    } = this.state;

    const showError = !validate && (dirty || formDirty);

    return (
      <div className={`form-control ${showError && 'error'}`}>
        <label>{label}</label>
        <input
          value={value}
          onChange={this.onChange}
          type="text"
        />
        <div className="validation-error">{showError && validationMessage}</div>
      </div>
    );
  }
}

Input.defaultProps = {
  value: '',
  validate: undefined,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  validate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  validationMessage: PropTypes.string.isRequired,
  formDirty: PropTypes.bool.isRequired,
  resetChild: PropTypes.bool.isRequired,
  resetFinished: PropTypes.func.isRequired,
  onDataChange: PropTypes.func.isRequired,
};
