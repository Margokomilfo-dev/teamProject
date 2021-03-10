import { useFormik } from 'formik';
import React from 'react'
import s from './Registration.module.css'
import {useDispatch, useSelector} from 'react-redux'
import { AppRootStateType } from '../../../redux/store';
import {setRegistration} from '../../../redux/authReducer'

type FormikDataType = {
	email: string
	password1: string
	password2: string
}
export const Registration = () => {
	const dispatch = useDispatch()
	const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered )

	const validate = (values: FormikDataType) => {
		const errors: any = {}
		if (!values.email) {
			errors.email = 'Required';
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address';
		}
		return errors
	}
	const formik = useFormik({
		initialValues: {
			email: 'margokomilfo@mail.ru',
			password1: '12345678',
			password2: '12345678',
		}as FormikDataType,
		validate,
		onSubmit: values => {
			console.log(values);
			dispatch(setRegistration({email:values.email, password:values.password1}))
		},
	})
	return (
		<div className={s.registrationOverlay}>
			<h1>Registration form</h1>
			<form onSubmit={formik.handleSubmit}>

				<input name="email" value={formik.values.email}  onChange={formik.handleChange}/>
				{formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

				<input name="password1" type='password' value={formik.values.password1} onChange={formik.handleChange}/>
				{formik.touched.email && formik.errors.password1 && <div>{formik.errors.password1}</div>}

				<input name="password2" type='password' value={formik.values.password2} onChange={formik.handleChange}/>
				{formik.touched.email && formik.errors.password2 && <div>{formik.errors.password2}</div>}

				<button type="submit">Submit</button>
			</form>
		</div>
	)
}
