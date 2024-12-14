import React, { useState } from "react";

const FindProjectModal = ({ setSearchQuery }) => {
    const [input, setInput] = useState("");

    const handleSearch = async () => {
        if (!input.trim()) {
            alert("Please enter a project name to search.");
            setSearchQuery("");
            return;
        }

        setSearchQuery(input)
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter project name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={(e) => setSearchQuery("")}>Reset</button>
        </div>
    );
};

export default FindProjectModal;
