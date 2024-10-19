
import style from "../../assets/CSS/Admin/InfoCard.module.css"

export default function InfoCard({ icon, iconColor, name, number, color }) {
    return (
        <div className={style.InfoCard} style={{ backgroundColor: `${color}` }}>
            <div className={style.data}>
                <div className={style.icon} style={{ color: `${iconColor}` }}>{icon}</div>
                <div className={style.name}>{name}</div>
            </div>
            <div className={style.number}>{number}</div>
        </div>
    )

}