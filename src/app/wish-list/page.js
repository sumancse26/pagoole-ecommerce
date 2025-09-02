import Wishlist from '@components/wishlist/Wishlist';
import { auth } from '@/auth';
import { getWishList } from '@/services/wishList';
const WishListPage = async () => {
    const session = await auth();

    let wishList = [];

    if (session?.user) {
        const wish = await getWishList();

        //wishList = wish.wish_lists || [];

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

    return (
        <>
            <Wishlist wishList={wishList} />
        </>
    );
};

export default WishListPage;
