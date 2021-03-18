import React from 'react'
import {Form, Input, Button } from 'antd'
import s from './PasswordRecovery.module.css'
import {sendEmailPassRecTC, setErrorPassRec} from "../../../redux/forgotReducer"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"

export const PasswordRecovery = () => {

	const dispatch = useDispatch()

	const errorPassRec = useSelector<AppRootStateType, string>(state => state.passRec.error)
	const infoPassRec = useSelector<AppRootStateType, string>(state => state.passRec.info)

	const from = "THE BEST MY TEAM baranov.sys@gmail.com"
	const message = `<div>
											вы отправили запрос на восстановления пароля, для продожения перейдите по ссылке:
											<a href='http://baranovaleksei.github.io/teamProject/#/new-pass/$token$'>link</a>
											если это были на Вы - то ничего не делайте
									</div>`


	const onFinish = (values: any) => {
		dispatch(sendEmailPassRecTC({ email: values.emailRecPass, message: message, from: from}))
		setTimeout(() => {
			dispatch(setErrorPassRec(''))
		}, 5000)
	}

	return (
		<div className={s.passRecOverlay}>

			<span className={s.nameRecPass}>{infoPassRec}</span>
			<Form className={s.formRecPass}
				name="recoveryPass"
				initialValues={{ remember: true }}
				onFinish={onFinish}>

				<Form.Item
					label="Email"
					name="emailRecPass"
					rules={[{ type: 'email', required: true, message: 'Please input your email' }]}
				>
					<Input />

				</Form.Item>
					<span className={s.nameRecPass}> {errorPassRec} </span>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						send message
					</Button>
				</Form.Item>

			</Form>
		</div>
	)
}