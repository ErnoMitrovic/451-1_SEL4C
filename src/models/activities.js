import axios from "axios";
import { getToken } from "./token";
import CustomBodyCell from "../components/TableView/CustomBodyCell";

export const activitiesColumns = [
    {
        name: "user",
        label: "Usuario",
    },
    {
        name: "progress",
        label: "Progreso",
        options: {
            customBodyRender: value => <CustomBodyCell value={value} />
        }
    }
]

export async function getMethodology() {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    };

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/methodology/activities/`, {
            headers: headers,
        });
        return response.data;
    } catch (error) {
        throw new Error('Internal error');
    };
};

export async function knowUserDefaultID() {
    const activities = await getMethodology();
    return activities.filter((activity) => activity.title === "User Defaults")[0].id;
};

export async function filterUserDefaults(data) {
    const userDefaultsID = await knowUserDefaultID();
    return data.filter((activity) => activity.activity !== userDefaultsID);
};

export async function getData(user_id) {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    };

    // Optional query parameter for fetching activities from a specific user
    const params = {};

    if (user_id) {
        params.user_id = user_id;
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/response/activity/`, {
            headers: headers,
            params: params,
        });
        return response.data;
    } catch (error) {
        throw new Error('Internal error');
    };
};

export function getActivityProgress(activitiesData) {
    const progressMap = new Map();

    // Iterate through the activitiesData
    for (const activity of activitiesData) {
        const userId = activity.user;

        if (activity.response_type === "text" && activity.string_response === "complete") {
            // User has completed the activity, mark it in the progress map
            if (!progressMap.has(userId)) {
                progressMap.set(userId, { completedActivities: new Set(), total: 6 });
            }
            progressMap.get(userId).completedActivities.add(activity.activity);
        }
    }

    // Calculate the progress for each user as a percentage
    const progress = Array.from(progressMap.entries()).map(([user, { completedActivities, total }]) => ({
        user,
        progress: (completedActivities.size / total) * 100 || 0
    }));

    return progress;
}

