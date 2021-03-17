import React from 'react'
import s from './Header.module.css'
import {PATH} from "../Routes/Routes"
import {NavLink} from "react-router-dom"

function Header() {
	return (
		<div className={s.nav}>
			<button className={ s.menuHover }> Меню </button>
			<div className={s.items}>
				<div className={ s.item }>
					<NavLink to= { PATH.PROFILE } activeClassName = { s.activeLink }>Profile</NavLink>
				</div>
				<div className={ s.item }>
					<NavLink to={ PATH.LOGIN } activeClassName = { s.activeLink }>Login</NavLink>
				</div>
				<div className={ s.item }>
					<NavLink to={ PATH.REGISTRATION } activeClassName = { s.activeLink }>Registration</NavLink>
				</div>
				{/*<div className={ s.item }>*/}
				{/*	<NavLink to={ PATH.NEW_PASSWORD } activeClassName = { s.activeLink }>New password</NavLink>*/}
				{/*</div>*/}
				<div className={ s.item }>
					<NavLink to={ PATH.PASSWORD_RECOVERY } activeClassName = { s.activeLink }>Password recovery</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Header