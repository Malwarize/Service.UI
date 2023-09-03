import "../App.css";
interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

function SearchBar({searchQuery, setSearchQuery}: SearchBarProps) {
    const handleSearch = (e: any) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="mr-10">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-3 h-3 text-deep-gray dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="py-1 pl-7 w-fit text-xs text-gray-900 rounded-3xl"
                    placeholder="search"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
        </div>
    )
}
export default SearchBar;