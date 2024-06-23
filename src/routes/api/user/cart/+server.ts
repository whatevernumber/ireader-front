import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function GET({cookies}) {

    if (!cookies.get('bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/cart', {
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