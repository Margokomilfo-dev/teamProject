import React from 'react'
import {useFormik} from 'formik'
import {Button, FormControl, FormGroup, Grid, TextField} from "@material-ui/core";
import {passRecTC} from "../../../redux/forgotReducer";
import {useDispatch} from "react-redux";

type PassRecType = {
	email: string
	from: string
	message: string
}

export const PasswordRecovery = () => {

	type FormikErrosType = {
		email?: string
	}
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			email: '',
			from: 'test-front-admin <baranov.sys@gmail.com>',
			message: `<div style="background-color: lime;padding: 15px> password recovery link: 
<a href='http://localhost:3000/teamProject#/new-pass/$token$'>link </a> </div>`
		},
		validate: (values: PassRecType) => {
			const errors: FormikErrosType = {};
			if (!values.email) {
				errors.email = 'Обезательно для ввода';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Не корректный email';
			}
			return errors
		},
		onSubmit: values => {
			dispatch(passRecTC ({email: values.email, from: values.from, message: values.message} ))
			formik.resetForm()
		}
	})

	return (
		<Grid container justify="center" alignItems="stretch" style={{height: '100vh'}}>
			<Grid container justify="center" alignItems="center" >
				<form onSubmit={formik.handleSubmit}>
					<FormControl>
						<FormGroup>
							<TextField
								label='Email'
								margin = 'normal'
								{...formik.getFieldProps('email')}
							/>
							{ formik.touched.email && formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
							<Button type={'submit'} variant={'contained'} color={'primary'}>Send email</Button>
						</FormGroup>
					</FormControl>
				</form>
			</Grid>
		</Grid>
	)
}