import { useEffect, useState, useRef } from 'react';

const SearchableDropdown = ({
    options = [],
    onSelect,
    labelKey = 'name',
    valueKey = 'value',
    placeholder = 'Search or select...',
    selected
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [internalSelected, setInternalSelected] = useState(null);
    const containerRef = useRef(null);

    // ✅ Format the display text consistently
    const formatLabel = (item) => {
        if (!item) return '';
        const label = item[labelKey] ?? '';
        return label;
    };

    // ✅ Sync when parent provides a selected item
    useEffect(() => {
        if (selected) {
            setInternalSelected(selected);
            setQuery(formatLabel(selected));
        } else {
            setInternalSelected(null);
            setQuery('');
        }
    }, [selected]);

    // ✅ Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ✅ Handle selection
    const handleSelect = (item) => {
        setInternalSelected(item);
        setQuery(formatLabel(item));
        setIsOpen(false);
        onSelect?.(item);
    };

    // ✅ Filter options
    const filteredOptions = options.filter((item) => {
        const text = `${item[labelKey]} ${item[valueKey]}`.toLowerCase();
        return text.includes(query.toLowerCase());
    });

    return (
        <div ref={containerRef} className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className="w-full px-2 py-1 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-green-500"
            />

            {isOpen && (
                <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-lg shadow max-h-60 overflow-y-auto w-full">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((item, index) => (
                            <li
                                key={index}
                                onMouseDown={() => handleSelect(item)} // 🧠 prevents blur clearing input
                                className={`px-4 py-2 cursor-pointer hover:bg-green-200 text-sm ${
                                    internalSelected?.[valueKey] === item[valueKey]
                                        ? 'bg-green-100 font-medium'
                                        : 'text-gray-700'
                                }`}>
                                {formatLabel(item)}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-sm text-gray-400">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchableDropdown;
