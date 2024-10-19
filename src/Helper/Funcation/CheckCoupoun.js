import { getAllCoupons } from "../Apis/Admin/Coupons/getAllCoupons";
const CheckCoupoun = async (coupono) => {
    console.log(coupono)
    try {
        const couponData = await getAllCoupons();
        console.log(couponData.data.coupons)
        const coupon = couponData.data.coupons.find((coupon) => coupon.code === coupono);
        console.log("coupon", coupon.code);
        return coupon;
    } catch (error) {
        console.log(error);
    }
}

export default CheckCoupoun