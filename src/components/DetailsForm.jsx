import React from 'react';
import Input from './Input';
import PropTypes from 'prop-types';
import DetailsPropTypes from '../PropTypes/DetailsPropTypes';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function getValidationMessageForConfirmEmail(confirmEmail, email) {
  if (!confirmEmail) {
    return 'Please enter your Confirm Email';
  }

  if (confirmEmail !== email) {
    return 'The Confirm Email is not same as Email';
  }

  return '';
}

function getValidationMessageForNumber(value) {
  if (!value) {
    return 'Please enter this part';
  }

  if (isNaN(value)) {
    return 'Please enter a valid number';
  }

  return '';
}

function getValidationMessageForEmail(email) {
  if (!email) {
    return 'Please enter your Email';
  }

  if (!validateEmail(email)) {
    return 'The Email format is invalid';
  }

  return '';
}

const DetailsForm = ({
  data,
  onDataChange,
  dirty,
  resetChild,
  resetFinished,
}) => {
  const confirmEmailValidationMessage = getValidationMessageForConfirmEmail(data.confirmEmail, data.email);

  return (
    <div className="details">
      <Input
        label="Name"
        value={data.name}
        formDirty={dirty}
        validate={data.name}
        onDataChange={value => onDataChange('name', value)}
        validationMessage="Please enter your name"
        resetChild={resetChild}
        resetFinished={resetFinished}
      />
      <Input
        label="Email"
        value={data.email}
        formDirty={dirty}
        validate={!getValidationMessageForEmail(data.email)}
        onDataChange={value => onDataChange('email', value)}
        validationMessage={getValidationMessageForEmail(data.email)}
        resetChild={resetChild}
        resetFinished={resetFinished}
      />
      <Input
        label="Confirm Email"
        value={data.confirmEmail}
        formDirty={dirty}
        validate={!confirmEmailValidationMessage}
        onDataChange={value => onDataChange('confirmEmail', value)}
        validationMessage={confirmEmailValidationMessage}
        resetChild={resetChild}
        resetFinished={resetFinished}
      />
      <Input
        label="Address"
        value={data.address}
        formDirty={dirty}
        validate={data.address}
        onDataChange={value => onDataChange('address', value)}
        validationMessage="Please enter your Address"
        resetChild={resetChild}
        resetFinished={resetFinished}
      />
      <Input
        label="Post Code"
        value={data.postCode}
        formDirty={dirty}
        validate={!getValidationMessageForNumber(data.postCode)}
        onDataChange={value => onDataChange('postCode', value)}
        validationMessage={getValidationMessageForNumber(data.postCode)}
        resetChild={resetChild}
        resetFinished={resetFinished}
      />
      <Input
        label="Contact Number"
        value={data.contactNumber}
        formDirty={dirty}
        validate={!getValidationMessageForNumber(data.contactNumber)}
        onDataChange={value => onDataChange('contactNumber', value)}
        validationMessage={getValidationMessageForNumber(data.contactNumber)}
        resetChild={resetChild}
        resetFinished={resetFinished}
      />
    </div>
  );
};

DetailsForm.propTypes = {
  data: PropTypes.shape(DetailsPropTypes).isRequired,
  onDataChange: PropTypes.func.isRequired,
  dirty: PropTypes.bool.isRequired,
  resetChild: PropTypes.bool.isRequired,
  resetFinished: PropTypes.func.isRequired,
};

export default DetailsForm;
