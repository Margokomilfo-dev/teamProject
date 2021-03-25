import img from '../../assets/img/Pulse.svg'
import s from './Loading.module.css'


export const Loading = () => {
    return <div className={s.loading}>
        <img src={img} alt=""/>
    </div>
}