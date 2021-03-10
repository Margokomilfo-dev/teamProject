import React from 'react'
import s from './Login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {Checkbox, FormControl, FormControlLabel, FormGroup, TextField, Button, Grid} from '@material-ui/core'
import {loginTC} from "../../../redux/loginReducer";
import {AppRootStateType} from "../../../redux/store";
import { Redirect } from 'react-router-dom';


export type AuthLoginType = {
	email: string
	password: string
	rememberMe: true
}

export const Login = () => {

	type FormikErrorType = {
		email?: string
		password?: string
		rememberMe?: boolean
	}

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: 'margokomilfo@mail.ru',
			password: '12345678',
			rememberMe: true
		},
		validate: (values: AuthLoginType) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = 'Поле email обязательно';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Невалидный email';
			} if (!values.password) {
				errors.password = 'Поле обязательно';
			} else if(values.password.length < 3) {
				errors.password = 'Длина пароля должна быть больше 3 символов';
			}
			return errors;
		},
		onSubmit: values => {
			dispatch(loginTC({email:values.email, password:values.password, rememberMe: values.rememberMe}))
			formik.resetForm();
		},
	})

	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

	// if(isLoggedIn) {
	// 	return <Redirect to={'/'}/>
	// }

	return <Grid container justify="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormGroup>
						<TextField
							label="Email"
							margin="normal"
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
						<TextField
							type="password"
							label="Password"
							margin="normal"
							{...formik.getFieldProps('password')}
						/>
						{formik.touched.password && formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
						<FormControlLabel
							label={'Remember me'}
							control={<Checkbox
								checked={formik.values.rememberMe}
								{...formik.getFieldProps('rememberMe')}
							/>}
						/>
						{formik.touched.rememberMe && formik.errors.rememberMe ? <div style={{color: "red"}}>{formik.errors.rememberMe}</div> : null}
						<Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
					</FormGroup>
				</FormControl>
			</form>

		</Grid>
	</Grid>
}
