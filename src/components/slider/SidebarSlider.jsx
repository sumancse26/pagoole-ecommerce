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
        if (typeof window !== "undefined" && window.innerWidth < 768) { // Tailwind md breakpoint
            setIsOpen(false);
        }

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
                            className={`transition-transform duration-300 cursor-pointer ${openIds.includes(category.id) ? 'rotate-90' : ''
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
                    className="fixed top-[15px] left-30 z-50 p-1 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className={`fixed top-0 left-0 h-screen overflow-y-auto shadow-lg z-50 bg-white 
              transition-all duration-300 ease-in-out 
              ${isOpen ? 'w-80' : 'w-0'} 
              md:sticky md:top-[58px] md:h-[calc(100vh-58px)] md:static pt-0 mt-0`}
                >
                    <div
                        className={`
                pt-[58px] md:pt-5 transition-opacity duration-300 ease-in-out h-full 
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
                px-4 w-80
            `}>

                        <div className="flex items-center justify-between px-4 py-2 bg-white ">
                            <h6 className="text-lg font-medium text-gray-800">All Categories</h6>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-800 transition-colors md:hidden"
                                aria-label="Close categories menu"
                                onClick={() => setIsOpen(false)}>
                                ✕
                            </button>
                        </div>

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

                {isOpen && (
                    <div
                        onClick={() => setIsOpen(false)}
                        className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
                    />
                )}
            </div >

        </>
    );
};

export default SidebarSlider;
