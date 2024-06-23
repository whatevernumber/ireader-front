import {error} from "@sveltejs/kit";

export async function load({fetch, params, cookies}) {

    if (!cookies.get('bearer')) {
        error(403);
    }

    const res: Response = await fetch(`/api/user?id=${params.id}`, {
        method: 'GET',
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