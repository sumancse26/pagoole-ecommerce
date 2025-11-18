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
    const [hadUserTyped, setHadUserTyped] = useState(false); // NEW: track whether user typed
    const containerRef = useRef(null);

    // Format label
    const formatLabel = (item) => {
        if (!item) return '';
        const label = item[labelKey] ?? '';
        return label;
    };

    // Sync selected from parent
    useEffect(() => {
        if (selected) {
            setInternalSelected(selected);
            setQuery(formatLabel(selected));
        } else {
            setInternalSelected(null);
            setQuery('');
        }
        setHadUserTyped(false); // reset typing flag when external selection changes
    }, [selected]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle selected
    const handleSelect = (item) => {
        setInternalSelected(item);
        setQuery(formatLabel(item));
        setIsOpen(false);
        setHadUserTyped(false); // reset typing flag after selection
        onSelect?.(item);
    };

    // Filter options
    let filteredOptions = options.filter((item) => {
        const text = `${item[labelKey]} ${item[valueKey]}`.toLowerCase();
        return text.includes(query.toLowerCase());
    });

    // If the user hasn't typed (i.e. they just opened it), hide the previously selected item
    if (!hadUserTyped && internalSelected) {
        filteredOptions = filteredOptions.filter(
            (item) => item[valueKey] !== internalSelected[valueKey]
        );
    }

    return (
        <div ref={containerRef} className="relative">
            {/* <input
                type="text"
                value={query}
                // open/close on click as before
                onClick={() => setIsOpen(!isOpen)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setHadUserTyped(true); // mark that the user typed
                    // keep dropdown open if it already is (search functionality)
                    if (isOpen) setIsOpen(true);
                }}
                placeholder={placeholder}
                name="searchable-dropdown"
                id="searchable-dropdown"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                className="w-full px-2 py-1 border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-green-500"
            /> */}

            <input
                type="text"
                placeholder={placeholder}
                name="searchable-dropdown"
                id="searchable-dropdown"
                value={query}
                onClick={() => setIsOpen(!isOpen)}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setHadUserTyped(true);
                    if (isOpen) setIsOpen(true);
                }}
                autoComplete="off"
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-500 outline-none dark:bg-neutral-700 dark:text-white"
            />

            {isOpen && (
                <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-lg shadow max-h-60 overflow-y-auto w-full">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((item, index) => (
                            <li
                                key={index}
                                onMouseDown={() => handleSelect(item)} // prevents blur
                                className={`px-4 py-2 cursor-pointer hover:bg-green-200 text-sm ${internalSelected?.[valueKey] === item[valueKey]
                                    ? 'bg-green-100 font-medium'
                                    : 'text-gray-700'
                                    }`}
                            >
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
