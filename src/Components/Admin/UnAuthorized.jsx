import UnPhoto from "../../assets/SVGs/401 Error Unauthorized-cuate.svg";
import style from "../../assets/CSS/Admin/UnAuthorized.module.css";
import { Link } from "react-router-dom";
export default function UnAuthorized() {
  return (
    <div className={style.UnAuthorized}>
      <img className={style.UnAuthorizedImg} src={UnPhoto} alt="UnAuthorized" />
      <h1 className={style.UnAuthorizedTitle}>UnAuthorized</h1>
      <h3 className={style.UnAuthorizedText}>
        Sorry, you are not authorized to visit this page
      </h3>
      <Link to="/sign" className={style.UnAuthorizedBtn}>
        Login
      </Link>
    </div>
  );
}
