import React, { useState } from "react";
const suggestions = [
    {
        id: 101, name: "John Doe",
        email: "johndoe@example.com",
        age: 29,
        location: "Dhaka, Bangladesh"
    },
    {
        id: 102,
        name: "Jane Smith",
        email: "janesmith@example.com",
        age: 34,
        location: "New York, USA"
    },
    {
        id: 103,
        name: "Ali Khan",
        email: "alikhan@example.com",
        age: 25,
        location: "Karachi, Pakistan"
    },
    {
        id: 104,
        name: "Maria Gonzalez",
        email: "mariagonzalez@example.com",
        age: 31,
        location: "Madrid, Spain"
    },
    {
        id: 105,
        name: "Kenji Tanaka",
        email: "kenjitanaka@example.com",
        age: 27,
        location: "Tokyo, Japan"
    }];
const AddCustomer = () => {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        age: "",
        location: ""
    });

    const handleInputChange = (e) => {
        const value = e.target.value; setInputValue(value);
        // Filter suggestions based on input 
        const matches = suggestions.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredSuggestions(matches);
    };
    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.name);
        setUserData({ name: suggestion.name, email: suggestion.email, age: suggestion.age, location: suggestion.location });
        setFilteredSuggestions([]);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };
    return (
        <div style={{ width: "300px" }}>
            <label> Name:
                <input type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type a name..."
                    style={{
                        width: "100%",
                        padding: "8px",
                        marginBottom: "5px"
                    }} />
            </label>
            <label> Email:
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleFieldChange}
                    placeholder="Enter email"
                    style={{ width: "100%", padding: "8px", marginBottom: "5px" }} />
            </label>
            <label> Age:
                <input
                    type="number"
                    name="age"
                    value={userData.age}
                    onChange={handleFieldChange}
                    placeholder="Enter age"
                    style={{ width: "100%", padding: "8px", marginBottom: "5px" }} />
            </label>
            <label> Location:
                <input type="text" name="location" value={userData.location}
                    onChange={handleFieldChange}
                    placeholder="Enter location"
                    style={{ width: "100%", padding: "8px", marginBottom: "5px" }} />
            </label>
            <div style={{ border: "1px solid #ccc", maxHeight: "100px", overflowY: "auto", background: "#f9f9f9" }} >
                {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((item) => (
                        <div key={item.id}
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={() => handleSuggestionClick(item)} > {item.name} {item.email} </div>)))
                    :
                    (
                        <div style={{ padding: "8px", color: "#777" }}>No match found</div>

                    )}
            </div>
        </div>
    );
};
export default AddCustomer;