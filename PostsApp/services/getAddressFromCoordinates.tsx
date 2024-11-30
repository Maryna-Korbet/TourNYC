import axios from 'axios';
import { GOOGLE_MAPS_API_KEY } from "@env"; 

type CoordinatesProps = {
    latitude: number;
    longitude: number;
}

export const getAddressFromCoordinates = async ({
    latitude,
    longitude
}: CoordinatesProps): Promise<string> => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
        );

        if (response.data.status === 'OK') {
            const results = response.data.results;

            // First address search without Plus Code
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (!result.formatted_address.includes("Plus Code")) {
                    return result.formatted_address || 'Address not found';
                }
            }

            return results[0]?.formatted_address || 'Address not found';
        } else {
            throw new Error(`Geocoding API error: ${response.data.status}`);
        }
    } catch (error) {
        throw error;
    }
};