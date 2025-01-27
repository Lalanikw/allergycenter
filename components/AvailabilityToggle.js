import { useState, useEffect } from "react";

export default function AvailabilityToggle() {
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        //Fetch the current availability status from API

        async function fetchAvailability() {
            const response = await fetch("api/getAvailabilityStatus");
            const data = await response.json();
            setIsAvailable(data.isAvailable);
        }
        fetchAvailability();
    }, []);

    //Toggle the availability status
    const toggleAvailability = async () => {
        const response = await fetch("api/updateAvailability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isAvailable: !isAvailable }),
        });

        const data = await response.json();
        if (data.success) {
            setIsAvailable(data.isAvailable); //update the state on success
        }
    };

    return (
        <div>
            <p>Current Status: {isAvailable ? "Available" : "Out of Office"}
            </p>
            <button
                onClick={toggleAvailability}
                className={`px-4 py-2 text-while ${isAvailable ? "bg-red-500" : "bg-green-500"
                    }`}>
                {isAvailable ? "Mark as out of Office" : "Mark as Available"}
            </button>
        </div>
    );
}