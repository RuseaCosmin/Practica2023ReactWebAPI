import * as React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function RegisterPage() {

    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
        
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: data.username, password: data.password, role: "User"})
            };
        fetch('api/users/insert', requestOptions)
            .then(navigate('/', { replace: true }));
        
    };
    return (
        <>
            <div className="register-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                   

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            name="username"
                            type="text"
                            {...register('username')}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>

                    

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
                                }`}
                        />
                        <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                        </div>
                    </div>

                    <div className="form-group form-check">
                        <input
                            name="acceptTerms"
                            type="checkbox"
                            {...register('acceptTerms')}
                            className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''
                                }`}
                        />
                        <label htmlFor="acceptTerms" className="form-check-label">
                            I have read and agree to the Terms
                        </label>
                        <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            className="btn btn-warning float-right"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>


            {/*<div className="cont">
                <div className="screen">
                    <div className="screen__content">
                        <form className="login" onSubmit={handleSubmit(onSubmit)}>
                            <div className="login__field">

                                <i className="login__icon fas fa-user"></i>
                                <input
                                    name="username"
                                    type="text"
                                    {...register('username')}
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.username?.message}</div>                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input
                                    name="password"
                                    type="password"
                                    {...register('password')}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    {...register('confirmPassword')}
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
                                        }`}
                                />
                                <div className="invalid-feedback">
                                    {errors.confirmPassword?.message}
                                </div>                           </div>
                            <div className="form-group form-check">
                                <input
                                    name="acceptTerms"
                                    type="checkbox"
                                    {...register('acceptTerms')}
                                    className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''
                                        }`}
                                />
                                <label htmlFor="acceptTerms" className="form-check-label">
                                    I have read and agree to the Terms
                                </label>
                                <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                            </div>
                            <button className="button login__submit submit">
                                <span className="button__text">Create Account</span>
                                <i className="button__icon fas fa-chevron-right"></i>
                            </button>
                        </form>
                        
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>*/}
        </>
    );
}

export default RegisterPage