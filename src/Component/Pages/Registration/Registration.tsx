import React from 'react'
import s from './Registration.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../redux/store'
import {setError, setRegistration} from '../../../redux/authReducer'
import {Redirect} from 'react-router-dom'
import {Form, Input, Button} from 'antd'


export const Registration = () => {
    const dispatch = useDispatch()
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered)
    const error = useSelector<AppRootStateType, string>(state => state.auth.error)
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    }
    const onFinish = (values: any) => {
        dispatch(setRegistration({email: values.email, password: values.password1}))
        setTimeout(() => {
            dispatch(setError(''))
        }, 10000)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }


    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.registrationOverlay}>


            <Form  {...layout} name="basic"  initialValues={{remember: true}} onFinish={onFinish}
                   onFinishFailed={onFinishFailed}>
                <Form.Item label="email" name="email"
                    rules={[
                        {required: true, message: 'Please input your email!'},
                        {type: 'email', message: 'The input is not valid E-mail!',}
                    ]}>
                    <Input style={{width: '100%'}} />
                </Form.Item>

                <Form.Item label="Password1" name="password1" hasFeedback
                           rules={[
                               {required: true, message: 'Please input your password!'},
                               ({getFieldValue}) => ({
                                   validator(_, value) {
                                       if (value.length < 8){return Promise.reject(new Error('8 and more' +
                                           ' symbols...'))} else
                                       if (value.length >= 8 || !value || getFieldValue('password1') === value) {
                                           return Promise.resolve()
                                       }
                                       return Promise.reject(new Error('Two passwords do not match!'))
                                   },
                               }),]}>
                    <Input.Password/>
                </Form.Item>

                <Form.Item label="Password2" name="password2"  hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (value.length < 8){return Promise.reject(new Error('8 and more symbols...'))} else
                                if (value.length >= 8 || !value || getFieldValue('password1') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error('Two passwords do not match!'))
                            },
                        }),
                    ]}>
                    <Input.Password/>
                </Form.Item>

                <Button type="primary" htmlType="submit">Button</Button>
                <div className={s.serverError}>{error}</div>
            </Form>
        </div>
    )
}
