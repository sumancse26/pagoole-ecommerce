import { Suspense } from 'react';
import Wishlist from '@components/wishlist/Wishlist';
import { auth } from '@/auth';
import { getWishList } from '@/services/wishList';
import WishListSkeleton from '@components/wishlist/WishListSkeleton';

const WishListContent = async () => {
    const session = await auth();

    let wishList = [];

    if (session?.user) {
        const wish = await getWishList();

        const groupedByVendor =
            wish.wish_lists.reduce((acc, item) => {
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
            }, {}) || [];
        wishList = Object.values(groupedByVendor);
    }

    return <Wishlist wishList={wishList} />;
};

const WishListPage = async () => {
    return (
        <Suspense fallback={<WishListSkeleton />}>
            <WishListContent />
        </Suspense>
    );
};

export default WishListPage;
