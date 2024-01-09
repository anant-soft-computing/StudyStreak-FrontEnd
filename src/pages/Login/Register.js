import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ajaxCall from '../../helpers/ajaxCall';
import { toast } from 'react-toastify';

const intialSignUpData = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  password2: '',
};

const reduerSignUp = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.reset) {
    return intialSignUpData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
  btnLabel: 'Sign Up',
};

const Register = () => {
  const [signUpData, dispatchSignUp] = useReducer(
    reduerSignUp,
    intialSignUpData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const navigate = useNavigate();

  const resetReducerForm = () => {
    dispatchSignUp({ type: 'reset' });
  };

  const setFormError = (fieldName, errMsg) => {
    setFormStatus((prevState) => ({
      isError: true,
      errMsg: { ...prevState.errMsg, [fieldName]: [errMsg] },
      isSubmitting: false,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    if (!signUpData.first_name) {
      setFormError('first_name', 'First Name is Required');
      isValid = false;
    }
    if (!signUpData.last_name) {
      setFormError('last_name', 'Last Name is Required');
      isValid = false;
    }
    if (!signUpData.username) {
      setFormError('username', 'User Name is Required');
      isValid = false;
    }
    if (!signUpData.email) {
      setFormError('email', 'Email is Required');
      isValid = false;
    }
    if (!signUpData.password) {
      setFormError('password', 'Password is Required');
      isValid = false;
    }
    if (signUpData.password.length < 8) {
      setFormError('password', 'Password must be at least 8 characters long');
      isValid = false;
    }
    if (!signUpData.password2) {
      setFormError('password2', 'Re-Enter Password is Required');
      isValid = false;
    }
    if (signUpData.password !== signUpData.password2) {
      setFormError('password', 'Password Does Not Match');
      isValid = false;
    }

    return isValid;
  };

  const doSignUp = async (e) => {
    e.preventDefault();
    resetReducerForm();
    if (!validateForm()) return;
    const data = JSON.stringify(signUpData);
    try {
      const response = await ajaxCall(
        '/registration/',
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: data,
        },
        8000
      );
      if (response.status === 201) {
        toast.success(response.data?.msg);
        setFormStatus({
          isError: false,
          errMsg: response.data?.msg,
          isSubmitting: false,
        });
        navigate('/');
      } else if (response.status === 400) {
        setFormStatus({
          isError: true,
          errMsg: response.data,
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: 'Some Problem Occurred. Please try again.',
        isSubmitting: false,
      });
    }
  };

  const renderError = (fieldName) => {
    return (
      <div className='text-danger d-flex justify-content-start mt-2'>
        {formStatus?.errMsg?.[fieldName]?.[0] ||
          formStatus?.errMsg?.[fieldName]}
      </div>
    );
  };

  return (
    <div>
      <form method='POST' onSubmit={doSignUp}>
        <div className='row'>
          <div className='col-xl-6'>
            <div className='login__form'>
              <label className='form__label'>First Name</label>
              <input
                className={`common__login__input ${
                  formStatus?.errMsg?.first_name && 'error-border'
                }`}
                type='text'
                placeholder='First Name'
                value={signUpData.first_name}
                aria-invalid={true}
                onChange={(e) =>
                  dispatchSignUp({
                    type: 'first_name',
                    value: e.target.value,
                  })
                }
              />
              {formStatus?.isError && renderError('first_name')}
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='login__form'>
              <label className='form__label'>Last Name</label>
              <input
                className={`common__login__input ${
                  formStatus?.errMsg?.last_name && 'error-border'
                }`}
                type='text'
                placeholder='Last Name'
                value={signUpData.last_name}
                onChange={(e) =>
                  dispatchSignUp({
                    type: 'last_name',
                    value: e.target.value,
                  })
                }
              />
              {formStatus?.isError && renderError('last_name')}
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='login__form'>
              <label className='form__label'>Username</label>
              <input
                className={`common__login__input ${
                  formStatus?.errMsg?.username && 'error-border'
                }`}
                type='text'
                placeholder='Username'
                value={signUpData.username}
                onChange={(e) =>
                  dispatchSignUp({
                    type: 'username',
                    value: e.target.value,
                  })
                }
              />
              {formStatus?.isError && renderError('username')}
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='login__form'>
              <label className='form__label'>Email</label>
              <input
                className={`common__login__input ${
                  formStatus?.errMsg?.email && 'error-border'
                }`}
                type='email'
                placeholder='Your Email'
                value={signUpData.email}
                onChange={(e) =>
                  dispatchSignUp({
                    type: 'email',
                    value: e.target.value,
                  })
                }
              />
              {formStatus?.isError && renderError('email')}
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='login__form'>
              <label className='form__label'>Password</label>
              <input
                className={`common__login__input ${
                  formStatus?.errMsg?.password && 'error-border'
                }`}
                type='password'
                placeholder='Password'
                value={signUpData.password}
                onChange={(e) =>
                  dispatchSignUp({
                    type: 'password',
                    value: e.target.value,
                  })
                }
              />
              {formStatus?.isError && renderError('password')}
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='login__form'>
              <label className='form__label'>Re-Enter Password</label>
              <input
                className={`common__login__input ${
                  formStatus?.errMsg?.password2 && 'error-border'
                }`}
                type='password'
                placeholder='Re-Enter Password'
                value={signUpData.password2}
                onChange={(e) =>
                  dispatchSignUp({
                    type: 'password2',
                    value: e.target.value,
                  })
                }
              />
              {formStatus?.isError && renderError('password2')}
            </div>
          </div>
        </div>
        <div className='login__form d-flex justify-content-between flex-wrap gap-2'>
          <div className='form__check'>
            <input type='checkbox' />{' '}
            <label>Accept the Terms and Privacy Policy</label>
          </div>
        </div>
        <div className='login__button'>
          {/* {formStatus.isError && (
            <div className='text-danger d-flex justify-content-center mb-2'>
              {formStatus.errMsg}
            </div>
          )} */}
          <div className='d-flex justify-content-center'>
            <button
              className='default__button'
              disabled={formStatus.isSubmitting}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
