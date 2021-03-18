import React from 'react'
import s from './NewPassword.module.css'
import {Button, Form, Input} from "antd"
import {newPassTC, setErrorNewPass} from '../../../redux/forgotReducer'
import {useDispatch, useSelector} from "react-redux"
import { useHistory } from "react-router-dom"
import {AppRootStateType} from "../../../redux/store";

export const NewPassword = () => {

	const dispatch = useDispatch()
	const error = useSelector<AppRootStateType, string>(state => state.passRec.errorNewPass)
	const infoNewPass = useSelector<AppRootStateType, string>(state => state.passRec.infoNewPass)

	const history = useHistory()

	const resetPasswordToken = history.location.pathname.slice(10, history.location.pathname.length)
	// alert (resetPasswordToken)

	const layout = {
		labelCol: {span: 8},
		wrapperCol: {span: 16},
	}

	const onFinish = (values: any) => {
		dispatch( newPassTC(values.newPassword1, resetPasswordToken) )
		setTimeout(() => {
			dispatch(setErrorNewPass(''))
		}, 5000)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className={s.newPassOverlay}>
			<span className={s.spanText}>{infoNewPass}</span>
			<Form  {...layout} name="basic"
			       initialValues={{remember: true}}
			       onFinish={onFinish}
			       onFinishFailed={onFinishFailed}>

				<Form.Item label="new password: " name="newPassword1" hasFeedback
				           rules={[
					           {required: true, message: 'Please input your password!'},
					           ({getFieldValue}) => ({
						           validator(_, value) {
							           if (value.length < 8){return Promise.reject(new Error('8 and more symbols...'))} else
							           if (value.length > 8 || !value || getFieldValue('password1') === value) {
								           return Promise.resolve()
							           }
							           return Promise.reject(new Error('Two passwords do not match!'))
						           },
					           }),]}>
					<Input.Password/>
				</Form.Item>

				<Form.Item label="repeat password: " name="newPassword2"  hasFeedback
				           rules={[
					           {
						           required: true,
						           message: 'Please confirm your password!',
					           },
					           ({getFieldValue}) => ({
						           validator(_, value) {
							           if (value.length < 8){return Promise.reject(new Error('8 and more symbols...'))} else
							           if (value.length > 8 || !value || getFieldValue('password1') === value) {
								           return Promise.resolve()
							           }
							           return Promise.reject(new Error('Two passwords do not match!'))
						           },
					           }),
				           ]}>
					<Input.Password/>
				</Form.Item>

				<Button type="primary" htmlType="submit">change password</Button>

			</Form>
			<div>{error}</div>
		</div>
	)
}