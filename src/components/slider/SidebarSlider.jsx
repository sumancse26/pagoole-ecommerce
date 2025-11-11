'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPublicCategoryList } from '@/services/categories';

const iconMap = {
    Electronics: <span className="material-icons">devices</span>,
    Fashion: <span className="material-icons">checkroom</span>,
    'Home & Garden': <span className="material-icons">home</span>,
    'Sports & Outdoors': <span className="material-icons">sports_soccer</span>,
    Beauty: <span className="material-icons">face_retouching_natural</span>,
    Books: <span className="material-icons">menu_book</span>,
    Toys: <span className="material-icons">toys</span>,
    Default: <span className="material-icons text-green-500">folder</span>
};

const SidebarSlider = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [openIds, setOpenIds] = useState([]);

    const router = useRouter(); 
    useEffect(() => { 
    
        
     
    fetchCategory(); 
}, []);

    const fetchCategory = async () => {
        try {
            const data = await getPublicCategoryList();
            const formatted = data.map((cat) => ({
                ...cat,
                icon: iconMap[cat.category_name] || iconMap.Default
            }));

            setCategories(formatted);
            setFilteredCategories(formatted);

            const allIds = getAllCategoryIds(formatted);
            setOpenIds(allIds);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getAllCategoryIds = (cats) => {
        let ids = [];
        cats.forEach((cat) => {
            ids.push(cat.id);
            if (cat.children?.length > 0) {
                ids = ids.concat(getAllCategoryIds(cat.children));
            }
        });
        return ids;
    };

    const toggleAccordion = (id) => {
        setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const filterCategoriesRecursive = (cats, term) => {
        return cats
            .map((cat) => {
                const matches = cat.category_name.toLowerCase().includes(term);
                const filteredChildren = cat.children ? filterCategoriesRecursive(cat.children, term) : [];

                if (matches || filteredChildren.length > 0) {
                    return { ...cat, children: filteredChildren };
                }
                return null;
            })
            .filter(Boolean);
    };

    const searchCategoryHandler = (searchTerm) => {
        const term = searchTerm?.toString()?.toLowerCase() || '';
        if (term.length > 0) {
            const filtered = filterCategoriesRecursive(categories, term);
            setFilteredCategories(filtered);
            setOpenIds(getAllCategoryIds(filtered));
        } else {
            setFilteredCategories(categories);
            setOpenIds(getAllCategoryIds(categories));
        }
    };
 
    const handleCategoryClick = async (id) => {
        router.push(`category-wise-product?category=${id}`);
    };

    const renderCategories = (cats) => {
        return cats.map((category) => (
            <div key={category.id} className="group relative">
                <div
                    className="flex items-center justify-between w-full px-4 py-3 hover:bg-green-100 rounded cursor-pointer"
                    onClick={() => handleCategoryClick(category.id)} // ✅ category click fetches products
                >
                    <div className="flex items-center">
                        <span className="mr-3">{category.icon}</span>
                        <span>{category.category_name}</span>
                    </div>

                    {category.children?.length > 0 && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation(); // ✅ prevent firing category click
                                toggleAccordion(category.id);
                            }}
                            className={`transition-transform duration-300 cursor-pointer ${
                                openIds.includes(category.id) ? 'rotate-90' : ''
                            }`}>
                            <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    )}
                </div>

                {category.children?.length > 0 && openIds.includes(category.id) && (
                    <div className="ml-6 border-l border-gray-200">{renderCategories(category.children)}</div>
                )}
            </div>
        ));
    };

    return (
        <>
       <div className="relative">
    {/* 1. Menu Icon Button (Visible on ALL screens) */}
    <button
        onClick={() => setIsOpen((prev) => !prev)}
        // Button remains fixed on ALL screens. Removed unnecessary sm:block and md:block.
        className="fixed top-[7px] left-35 z-50 p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer transition-colors"
    >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    </button>

    {/* 2. Sidebar/Category List */}
    <div
        className={`
            /* Fixed position on mobile, Sticky on desktop/tablet */
            fixed md:sticky top-0 md:top-[58px] left-0 h-screen md:h-[calc(100vh-58px)] 
            overflow-y-auto shadow-lg z-50 bg-white 
            transition-all duration-300 ease-in-out
            
            /* Toggle Logic: Sets width for hide/show */
            ${isOpen ? 'w-80' : 'w-0'}
            
            /* Hide the initial fixed position unless it's mobile */
            md:static
        `}
    >
        {/* 3. Sidebar Content: Hides content using opacity when width is 0 */}
        <div
            className={`
                pt-[58px] md:pt-5 transition-opacity duration-300 ease-in-out h-full
                
                /* Opacity controls content visibility when width collapses */
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                px-4 w-80 
            `}>
            {/* The inner content needs w-80 to ensure it doesn't try to flow when the outer div has w-0 */}
            
            <div className="px-4 pb-2 font-normal text-lg border-b border-gray-200">All Categories</div>

            <div className="p-2">
                <input
                    onInput={(e) => searchCategoryHandler(e.target.value)}
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Search categories"
                />
            </div>

            <div className="divide-y divide-gray-100 max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-200">
                {/* Ensure renderCategories is a function that returns JSX */}
                {renderCategories(filteredCategories)}
            </div>
        </div>
    </div>
    
    {/* 4. Optional: Backdrop for Mobile View (Covers content when open on mobile) */}
    {isOpen && (
        <div 
            onClick={() => setIsOpen(false)} 
            className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
        />
    )}
</div>

            {/* <div className="md:block">
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="sm:block fixed top-[7px] left-4 z-50 p-2 bg-green-500 text-white rounded-lg cursor-pointer">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>

                <div
                    className={`sticky top-[58px] transition-all duration-300 h-full overflow-y-auto shadow-lg z-50 bg-white ${
                        isOpen ? 'md:block  w-80' : 'w-0'
                    }`}>
                    <div
                        className={`pt-5 transition-opacity duration-300 ${
                            isOpen ? 'opacity-100 z-[999999]' : 'opacity-0'
                        } px-4`}>
                        <div className="px-4 pb-2 font-normal text-lg border-b border-gray-200">All Categories</div>

                        <div className="p-2">
                            <input
                                onInput={(e) => searchCategoryHandler(e.target.value)}
                                type="text"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Search categories"
                            />
                        </div>

                        <div className="divide-y divide-gray-100 max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-200">
                            {renderCategories(filteredCategories)}
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default SidebarSlider;
