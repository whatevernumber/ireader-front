import {error} from "@sveltejs/kit";

export async function load({fetch, params}) {
    const res: Response = await fetch(`/api/user?id=${params.id}`, {
        headers: {
            accept: 'application/json'
        },
    });

    if (res.status === 404) {
        error(404);
    }

    const data: object = await res.json();

    return {
        user: data,
    };
}