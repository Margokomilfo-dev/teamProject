import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Error404} from "../Pages/Error404/Error404";
import {Login} from "../Pages/Login/Login";
import {NewPassword} from "../Pages/NewPassword/NewPassword";
import {PasswordRecovery} from "../Pages/PasswordRecovery/PasswordRecovery";
import {Registration} from "../Pages/Registration/Registration";
import {Profile} from "../Pages/Profile/Profile";

export const PATH = {
	LOGIN: '/login',
	REGISTRATION: '/registration',
	PASSWORD_RECOVERY: '/pass-recovery',
	NEW_PASSWORD: '/new-pass',
	PROFILE: '/profile'
}

function Routes() {
	return (
		<div>
			<Switch>
				{/*в начале мы попадаем на страницу "/" и переходим сразу на страницу Login*/}
				{/*exact нужен чтоб указать полное совподение (что после "/" ничего не будет)*/}
				<Route path={"/"} exact render={ () => <Redirect to={ PATH.LOGIN }/> }/>

				<Route path={ PATH.LOGIN } render={ () => <Login/> } />
				<Route path={ PATH.REGISTRATION } render={ () => <Registration /> } />
				<Route path={ PATH.PASSWORD_RECOVERY } render={ ()=> <PasswordRecovery/> } />
				<Route path={ PATH.NEW_PASSWORD } render={ ()=> <NewPassword/> } />
				<Route path={ PATH.PROFILE } render={ ()=> <Profile/> } />

				{/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
				<Route render={ () => <Error404/>}/>

			</Switch>
		</div>
	)
}

export default Routes