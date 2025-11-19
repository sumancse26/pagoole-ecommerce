// SERVER COMPONENT
import Link from 'next/link';
import Logo from '@components/Logo';
import HeaderIcons from './HeaderIcon';
import HeaderClient from './HeaderClient';

import { auth } from '@/auth';
import { getAddToCartList } from '@/services/addToCart';
import { getWishList } from '@/services/wishList';

export default async function HeaderComp() {
    const session = await auth();

    let cartList = [];
    let wishList = [];

    if (session?.user) {
        const res = await getAddToCartList();
        const cartListData = res?.cart_items || 0;
        cartList = (cartListData?.length && cartListData?.map((item) => ({ ...item, isRemoving: false }))) || [];

        const wish = await getWishList();
        wishList = wish.wish_lists || [];
    }

    return (
        <header className="bg-white shadow sticky top-0 z-45">
            <div className="bg-green-600">
                <div className="mx-auto px-4 py-1 flex flex-wrap md:flex-nowrap items-center justify-between md:gap-[85px]">

                    <div className="flex items-center gap-3 cursor-pointer text-2xl font-extrabold
                        bg-gradient-to-r from-white via-lime-300 to-green-100 bg-clip-text text-transparent drop-shadow-md">

                        <Logo />
                    </div>

                    {/* Search section stays in client */}
                    <HeaderClient />

                    <HeaderIcons cartItemList={cartList} wishItemList={wishList} />
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden flex flex-1 justify-center mx-2 mt-2 pb-3">
                <HeaderClient isMobile />
            </div>
        </header>
    );
}
