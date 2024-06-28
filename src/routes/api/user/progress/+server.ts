import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function GET({cookies, url}) {

    const page: string|null = url.searchParams.get('page') ?? null;
    let query: string = page ? '?page=' + page : '';

    if (!cookies.get('bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/progress' + query, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('bearer')
        },
    });

    if (response.status === 401) {
        cookies.delete('bearer', { path: '/' });
        error(403);
    }

    const result: object = await response.json();

    return json(result);
}