import {_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url}) {

    const isbn: string|null = url.searchParams.get('isbn');

    if (!isbn) {
        return json({'error': 'no isbn provided'})
    }

    const res: Response = await fetch(`${_SERVER}/books/` + isbn, {
        headers: {
            accept: 'application/json'
        },
    });

    if (res.status === 404) {
        error(404);
    }

    const data: object = await res.json();

    return json(data);
}