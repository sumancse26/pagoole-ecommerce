import AddToCart from '@components/addToCart/AddToCart';
import { getAddToCartList } from '@/services/addToCart';
import { getWishList } from '@/services/wishList';
import { auth } from '@/auth';

const AddToCartPage = async () => {
    const session = await auth();
    let cartList = [];
    let wishList = [];

    if (session?.user) {
        const res = await getAddToCartList();
        cartList = res?.cart_items || [];

        const wish = await getWishList();
        wishList = wish.wish_lists || [];
    }

    return (
        <>
            <AddToCart cartList={cartList} wishList={wishList} />
        </>
    );
};

export default AddToCartPage;
