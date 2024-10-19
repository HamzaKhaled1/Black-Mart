import style from "../../../assets/CSS/Shared/Loading.module.css";
export default function Loading() {
  return (
    <div className={style.SpinnerContainer}>
      <div className={style.Spinner}></div>
      <div className={style.Loader}>
        <p>loading</p>
        <div className={style.Words}>
          <span className={style.Word}>Categories</span>
          <span className={style.Word}>Users</span>
          <span className={style.Word}>Sub-Categories</span>
          <span className={style.Word}>Products</span>
          <span className={style.Word}>Coupons</span>
          <span className={style.Word}>Orders</span>
        </div>
      </div>
    </div>
  );
}
