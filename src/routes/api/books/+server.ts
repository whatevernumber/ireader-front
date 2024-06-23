import {_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url}) {

    const text: string|null = url.searchParams.get('text') ?? null;
    const author: string|null = url.searchParams.get('author') ?? null;
    const genre: string|null = url.searchParams.get('genre') ?? null;
    const page: string|null = url.searchParams.get('page') ?? null;

    let query: string = '';

    if (text || author || genre) {
       query = '/search?';

        if (author) {
            query += ('author=' + author + '&');
        }

        if (genre) {
            query += ('genre=' + genre + '&');
        }

        if (text) {
            query += ('text=' + text);
        }
    }

    if (page) {
        query += ('?page=' + page);
    }

    const res: Response = await fetch(`${_SERVER}/books` + query, {
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