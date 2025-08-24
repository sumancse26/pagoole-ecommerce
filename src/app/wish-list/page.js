import Wishlist from '@components/wishlist/Wishlist';
import { auth } from '@/auth';
import { getWishList } from '@/services/wishList';
const WishListPage = async () => {
    const session = await auth();

    let wishList = [];

    if (session?.user) {
        const wish = await getWishList();
        wishList = wish.wish_lists || [];
    }

    console.log(wishList);

    return (
        <>
            <Wishlist wishList={wishList} />
        </>
    );
};

export default WishListPage;
