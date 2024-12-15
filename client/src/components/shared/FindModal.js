import React, { useState } from "react";

const FindModal = ({ setSearchQuery, searchedItem }) => {
    const [input, setInput] = useState("");

    const handleSearch = async () => {
        if (!input.trim()) {
            alert(`Please enter a ${searchedItem} name to search.`);
            setSearchQuery("");
            return;
        }

        setSearchQuery(input)
    };

    const handleReset = () => {
        setSearchQuery("")
        setInput("")
    }

    return (
        <div>
            <input
                type="text"
                placeholder={`Enter ${searchedItem} name`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default FindModal;
