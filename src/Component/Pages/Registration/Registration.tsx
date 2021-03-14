import React from 'react'
import s from './Registration.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../redux/store'
import {setRegistration} from '../../../redux/authReducer'
import {Redirect} from 'react-router-dom'
import {Form, Input, Button} from 'antd'


export const Registration = () => {
    const dispatch = useDispatch()
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered)
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    }
    const onFinish = (values: any) => {
        dispatch(setRegistration({email: values.email, password: values.password1}))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }


    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.registrationOverlay}>
            <h1>Registration form</h1>

            <Form  {...layout} name="basic" initialValues={{remember: true}} onFinish={onFinish}
                   onFinishFailed={onFinishFailed}>
                <Form.Item label="email" name="email" initialValue={'margokomilfo@mail.ru'}
                    rules={[
                        {required: true, message: 'Please input your email!'},
                        {type: 'email', message: 'The input is not valid E-mail!',}
                    ]}>
                    <Input/>
                </Form.Item>

                <Form.Item label="Password1" name="password1" initialValue={'12345678'}
                           rules={[{required: true, message: 'Please input your password!'}]}>
                    <Input.Password/>
                </Form.Item>

                <Form.Item label="Password2" name="password2" initialValue={'12345678'} hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password1') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'))
                            },
                        }),
                    ]}>
                    <Input.Password/>
                </Form.Item>

                <Button type="primary" htmlType="submit">Button</Button>
            </Form>
        </div>
    )
}
