import AddToCart from '@components/addToCart/AddToCart';
import { getAddToCartList } from '@/services/addToCart';
import { auth } from '@/auth';

const AddToCartPage = async () => {
    const session = await auth();
    let cartList = [];

    if (session?.user) {
        const res = await getAddToCartList();
        cartList = res?.cart_items || 0;
        //    cartList = (cartListData?.length && cartListData?.map((item) => ({ ...item, isRemoving: false }))) || [];
    }
    return (
        <>
            <AddToCart cartList={cartList} />
        </>
    );
};

export default AddToCartPage;
