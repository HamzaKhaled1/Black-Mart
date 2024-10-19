
import Wishlistcard from "./wishlistcard";

export default function Wishlist({flag}) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; 

  const loginData = JSON.parse(localStorage.getItem("loginData"));

  if (!loginData) {
    return (
      <div>
        <Header />
        <div className="flex flex-col p-16">
          <p className="text-3xl font-extrabold mb-10">Wishlist</p>
          <p className="text-lg">Please log in to view your wishlist.</p>
        </div>
        <Footer />
      </div>
    );
  }
  const id = loginData[0]?.Payload?.userId;
  const userwishlist = wishlist.filter((item) => item.userId === id);
  return (
    <div>
      <div className={`flex flex-col p-16 ${flag?"hidden":"block"}`}>
        <p className="text-3xl font-extrabold mb-10">Wishlist</p>
        {userwishlist.length > 0 ? (
          <div className="flex flex-col sm:flex-row gap-3 ">
            {userwishlist.map((item) => (
              <Wishlistcard
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-lg">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}
