import { useFormik } from 'formik';
import React from 'react'
import s from './Registration.module.css'

type FormikDataType = {
	email: string
	password1: string
	password2: string
}
export const Registration = () => {
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
			password1: '1234567',
			password2: '1234567',
		}as FormikDataType,
		validate,
		onSubmit: values => {
			alert(JSON.stringify(values))
		},
	})
	return (
		<div className={s.registrationOverlay}>
			<h1>Registration form</h1>
			<form onSubmit={formik.handleSubmit}>
				<input name="email" value={formik.initialValues.email}/>
				{formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

				<input name="password1" value={formik.initialValues.password1} type='password'/>
				{formik.touched.email && formik.errors.password1 && <div>{formik.errors.password1}</div>}

				<input name="password2"  value={formik.initialValues.password2} type='password'/>
				{formik.touched.email && formik.errors.password2 && <div>{formik.errors.password2}</div>}

				<button type="submit">Submit</button>
			</form>
		</div>
	)
}