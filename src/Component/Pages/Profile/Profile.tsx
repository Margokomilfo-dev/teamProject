import React from 'react'
import s from './Profile.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../redux/store'
import {NavLink, Redirect} from 'react-router-dom'
import {ProfileType} from '../../../redux/profileReducer'
import {logOutTC} from '../../../redux/loginReducer'
import {Loading} from '../../Loading/loading'

export const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector<AppRootStateType, ProfileType | null>(state => state.profile.profile)
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    const logout = () => {
    	dispatch(logOutTC())
	}

    if (status==='loading'){
        return <Loading/>
    }
     return (
        <div className={s.profileOverlay}>
            {profile &&
				<div className={s.profile}>
					<img src={profile.avatar} alt=""/>
					<div>
						name: {profile.name} <br/>
						token: {profile.token} <br/>
						_id: {profile._id}<br/>
						email: {profile.email}<br/>
						created: {profile.created}<br/>
						admin: {profile.isAdmin ? 'yes' : 'no'}<br/>

                        <NavLink to="/packs"> Packs</NavLink>
					</div>
					<div><button onClick={logout}>Log out</button></div>

				</div>

            }
        </div>
    )
}
