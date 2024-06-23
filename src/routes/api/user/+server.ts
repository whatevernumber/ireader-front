import {_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url, cookies}) {

    const id: string|null = url.searchParams.get('id');

    if (!id) {
        error(400);
    }

    const res: Response = await fetch(`${_SERVER}/users/` + id, {
        headers: {
            accept: 'application/json',
            authorization: cookies.get('bearer')
        },
    });

    if (res.status === 404) {
        error(404);
    }

    const data: object = await res.json();

    return json(data);
}