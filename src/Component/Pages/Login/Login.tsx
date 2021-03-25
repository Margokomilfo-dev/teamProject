import React, {useEffect} from 'react'
import s from './Login.module.css'
import './login.css'
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
// import {Checkbox, FormControl, FormControlLabel, FormGroup, TextField, Button, Grid} from '@material-ui/core'
import {loginTC} from "../../../redux/loginReducer";
import {AppRootStateType} from "../../../redux/store";
import {NavLink, Redirect } from 'react-router-dom';
import { initializeAppTC } from '../../../redux/appReducer';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {stat} from 'fs'


//
// export type AuthLoginType = {
// 	email: string
// 	password: string
// 	rememberMe: true
// }
// type FormikErrorType = {
// 	email?: string,
// 	password?: string,
// 	rememberMe?: boolean,
// }
//
// export const Login = () => {
// 	const dispatch = useDispatch()
// 	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
//
//
// 	const formik = useFormik({
// 		initialValues: {
// 			// email: 'nya-admin@nya.nya',
// 			// password: '1qazxcvBG',
// 			email: 'baranov.sys@gmail.com',
// 			password: '123456789',
// 			rememberMe: true
//
// 		},
// 		validate: (values: AuthLoginType) => {
// 			const errors: FormikErrorType = {};
// 			if (!values.email) {
// 				errors.email = 'Поле email обязательно';
// 			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
// 				errors.email = 'Невалидный email';
// 			} if (!values.password) {
// 				errors.password = 'Поле обязательно';
// 			} else if(values.password.length < 3) {
// 				errors.password = 'Длина пароля должна быть больше 3 символов';
// 			}
// 			return errors;
// 		},
// 		onSubmit: values => {
// 			dispatch(loginTC({email:values.email, password:values.password, rememberMe: values.rememberMe}))
// 			formik.resetForm();
// 		},
// 	})
//
// 	if(isLoggedIn) {
// 		return <Redirect to={'/profile'}/>
// 	}
//
// 	return <Grid container justify="center">
// 		<Grid item xs={4}>
// 			<form onSubmit={formik.handleSubmit}>
// 				<FormControl>
// 					<FormGroup>
// 						<p>To log in use common test account credentials:</p>
// 						<p><span>Email: </span> nya-admin@nya.nya</p>
// 						<p><span>Password: </span> 1qazxcvBG</p>
//
// 						<TextField
// 							label="Email"
// 							margin="normal"
// 							{...formik.getFieldProps('email')}
// 						/>
// 						{formik.touched.email && formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
// 						<TextField
// 							type="password"
// 							label="Password"
// 							margin="normal"
// 							{...formik.getFieldProps('password')}
// 						/>
// 						{formik.touched.password && formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
// 						<FormControlLabel
// 							label={'Remember me'}
// 							control={<Checkbox
// 								checked={formik.values.rememberMe}
// 								{...formik.getFieldProps('rememberMe')}
// 							/>}
// 						/>
// 						{formik.touched.rememberMe && formik.errors.rememberMe ? <div style={{color: "red"}}>{formik.errors.rememberMe}</div> : null}
// 						<Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
// 					</FormGroup>
// 				</FormControl>
// 			</form>
//
// 		</Grid>
// 	</Grid>
// }




export const Login = () => {
	const dispatch = useDispatch()


	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
		if(isLoggedIn) {
		return <Redirect to={'/profile'}/>
	}
	const onFinish = (values: any) => {
		dispatch(loginTC({email:values.email, password:values.password, rememberMe: values.rememberMe}))
	};


	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			<Form.Item
				name="email"
				initialValue={'nya-admin@nya.nya'}
				rules={[{ required: true, message: 'Please input your Username!' }]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
			</Form.Item>
			<Form.Item
				name="password"
				initialValue={'1qazxcvBG'}
				rules={[{ required: true, message: 'Please input your Password!' }]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name="remember" valuePropName="checked" noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<a className="login-form-forgot" href="">
					Forgot password
				</a>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
				Or <NavLink to={'/registration'}>register now!</NavLink>
			</Form.Item>
		</Form>
	);
};