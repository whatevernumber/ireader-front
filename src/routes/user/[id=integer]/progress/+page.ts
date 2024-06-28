import {error} from "@sveltejs/kit";

export async function load({fetch}) {

    const res: Response = await fetch('/api/user/progress?page=1', {
        headers: {
            accept: 'application/json'
        },
    });

    if (res.status === 403) {
        error(403);
    }

    const data: object = await res.json();

    return {
        progress: data,
    };
}