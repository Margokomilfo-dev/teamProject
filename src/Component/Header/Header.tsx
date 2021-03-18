import React from 'react'
import s from './Header.module.css'
import {PATH} from "../Routes/Routes"
import {NavLink, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../redux/store'

function Header() {
	const isLogin = useSelector<AppRootStateType,  boolean>(state=> state.auth.isLogin)

	return (
		<div className={s.nav}>
			<button className={ s.menuHover }> Меню </button>
			<div className={s.items}>
				{isLogin &&

				<div className={ s.item }>
					<NavLink to= { PATH.PROFILE } activeClassName = { s.activeLink }>Profile</NavLink>
				</div>
				}
				{!isLogin && <div className={ s.item }>
					<NavLink to={ PATH.LOGIN } activeClassName = { s.activeLink }>Login</NavLink>
				</div>}
				{!isLogin &&<div className={ s.item }>
					<NavLink to={ PATH.REGISTRATION } activeClassName = { s.activeLink }>Registration</NavLink>
				</div>}
				{!isLogin &&<div className={ s.item }>
					<NavLink to={ PATH.PASSWORD_RECOVERY } activeClassName = { s.activeLink }>Password recovery</NavLink>
				</div>}
				{/*<div className={ s.item }>*/}
				{/*	<NavLink to={ PATH.NEW_PASSWORD } activeClassName = { s.activeLink }>New password</NavLink>*/}
				{/*</div>*/}
				{isLogin &&
					<div className={ s.item } >
						<NavLink to={ PATH.PACKS } activeClassName = { s.activeLink }>Packs</NavLink>
					</div>
				}

			</div>
		</div>
	)
}

export default Header
