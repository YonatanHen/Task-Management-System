import React, { useState } from "react";
import axios from "axios";

import { HOST } from "../constants/host";

const FindProjectModal = ({ setProjects }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            alert("Please enter a project name to search.");
            setSearchQuery("");
            return;
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter project name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {results.length > 0 && (
                <div>
                    <ul>
                        {results.map((project) => (
                            <li key={project.id}>{project.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FindProjectModal;
