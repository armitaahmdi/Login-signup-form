import React, { useEffect, useState } from 'react';
import { validate } from './validate';
import { notify } from './toast'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './signUp.module.css';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAccepted: false
    })

    const checkHandler = event => {
        if (event.target.name === 'isAccepted') {
            setData({ ...data, [event.target.name]: event.target.checked })
        } else {
            setData({ ...data, [event.target.name]: event.target.value })
        }
        // console.log(data)
    }

    const [touched, setTouched] = useState({});

    const blurHandler = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validate(data, 'signup'))
        // console.log(errors);
    }, [data, touched])

    const submitHandler = event => {
        event.preventDefault();
        //  طول اررور را بررسی میکنیم که آبجکت است و برای بدست آوزدن طول آبجکت آن را تبدیل میکنیم به آرایه و کلید را میگیریم
        if (!Object.keys(errors).length) {
            notify('You signed up successfully!', "success", { theme: "colored" });
        } else {
            notify('Invalid data!', "error", { theme: "colored" })
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true
            })
        }
    }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={submitHandler}>
                    <h2>SignUp</h2>
                    <div className={styles.formField}>
                        <label>Name</label>
                        <input
                            className={(errors.name && touched.name) ? styles.unCompleted : styles.formInput}
                            type='text'
                            name='name'
                            value={data.name}
                            onChange={checkHandler}
                            onBlur={blurHandler}
                        />
                        {errors.name && touched.name && <span>{errors.name}</span>}
                    </div>
                    <div className={styles.formField}>
                        <label>E-mail</label>
                        <input
                            className={(errors.email && touched.email) ? styles.unCompleted : styles.formInput}
                            type='email'
                            name='email'
                            value={data.email}
                            onChange={checkHandler}
                            onBlur={blurHandler}
                        />
                        {errors.email && touched.email && <span>{errors.email}</span>}
                    </div>
                    <div className={styles.formField}>
                        <label>Password</label>
                        <input
                            className={(errors.password && touched.password) ? styles.unCompleted : styles.formInput}
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={checkHandler}
                            onBlur={blurHandler}
                        />
                        {errors.password && touched.password && <span>{errors.password}</span>}
                    </div>
                    <div className={styles.formField}>
                        <label>Confirm password</label>
                        <input
                            className={(errors.confirmPassword && touched.confirmPassword) ? styles.unCompleted : styles.formInput}
                            type='password'
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={checkHandler}
                            onBlur={blurHandler}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}
                    </div>
                    <div className={styles.formField}>
                        <div className={styles.checkboxContainer}>
                            <label>I accept terms of privacy policy</label>
                            <input
                                type='checkbox'
                                name='isAccepted'
                                value={data.isAccepted}
                                onChange={checkHandler}
                                onBlur={blurHandler}
                            />
                        </div>
                        {errors.isAccepted && touched.isAccepted && <span>{errors.isAccepted}</span>}
                    </div>
                    <div className={styles.formButtons}>
                        <Link to='/login'>Login</Link>
                        <button type='submit'>Sign Up</button>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </>
    );
};

export default SignUp;