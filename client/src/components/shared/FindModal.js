import React, { useState } from "react";

const FindModal = ({ setSearchQuery, searchedItem }) => {
    const [input, setInput] = useState("");

    const handleSearch = async () => {
        /** Handles results once an item is searched based on user input. */
        if (!input.trim()) {
            alert(`Please enter a ${searchedItem} name to search.`);
            setSearchQuery("");
            return;
        }

        setSearchQuery(input)
    };

    const handleReset = () => {
        /** Reset search input */
        setSearchQuery("")
        setInput("")
    }

    return (
        <div id="input-items">
            <input
                type="text"
                placeholder={`Search ${searchedItem}`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
                <button onClick={handleSearch}>Submit</button>
                <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default FindModal;
