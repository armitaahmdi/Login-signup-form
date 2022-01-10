import React, { useEffect, useState } from 'react';
import { validate } from './validate';
import { notify } from './toast'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './signUp.module.css';
import { Link } from 'react-router-dom';


const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const checkHandler = event => {
        setData({ ...data, [event.target.name]: event.target.value })
        // console.log(data)
    }

    const [touched, setTouched] = useState({});

    const blurHandler = event => {
        setTouched({ ...touched, [event.target.name]: true })
    }

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validate(data, 'login'))
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
                email: true,
                password: true,
            })
        }
    }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={submitHandler}>
                    <h2>Login</h2>
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
                    <div className={styles.formButtons}>
                        <Link to='/signup'>Sign Up</Link>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <ToastContainer position="top-center" />
            </div>
        </>
    );
};

export default Login;