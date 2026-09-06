const API_URL = "http://localhost:8080/assignments";

export const createAssignment = async (assignment) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
    });
    if (!response.ok) {
        throw new Error("Failed to create assignment");
    }
    return response.json();
}
    export async function getAssignments() {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch assignments");
        }
        return response.json();
    };