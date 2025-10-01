import { Suspense } from 'react';
import AddToCart from '@components/addToCart/AddToCart';
import { getAddToCartList } from '@/services/addToCart';
import { getWishList } from '@/services/wishList';
import { auth } from '@/auth';
import CartSkeleton from '@components/addToCart/CartSkeleton';

const AddToCartContent = async () => {
    const session = await auth();
    let cartList = [];
    let wishList = [];

    if (session?.user) {
        const res = await getAddToCartList();
        const cartRes = res?.cart_items || [];

        const groupedByVendor = cartRes.reduce((acc, item) => {
            const vendorId = item.vendor_products?.vendors?.id;
            if (vendorId) {
                if (!acc[vendorId]) {
                    acc[vendorId] = {
                        vendor_info: item.vendor_products.vendors,
                        items: []
                    };
                }
                acc[vendorId].items.push(item);
            }
            return acc;
        }, {});
        cartList = Object.values(groupedByVendor);

        const wish = await getWishList();
        wishList = wish.wish_lists || [];
    }

    return <AddToCart cartList={cartList} wishList={wishList} />;
};

const AddToCartPage = () => {
    return (
        <Suspense fallback={<CartSkeleton />}>
            <AddToCartContent />
        </Suspense>
    );
};

export default AddToCartPage;
