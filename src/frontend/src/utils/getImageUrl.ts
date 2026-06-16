const BASE_URL = "https://ami-furima-production.up.railway.app";

export const getImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith("images/")) {
        return `${BASE_URL}/${imagePath}`;
    }
    return `${BASE_URL}/storage/${imagePath}`;
};
