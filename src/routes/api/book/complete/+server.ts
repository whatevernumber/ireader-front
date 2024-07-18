import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function POST({ url, cookies }): Promise<Response> {

    let isbn: string = url.searchParams.get('isbn');

    if (!isbn) {
        error(400);
    }

    if (!cookies.get('ireader-bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/completed/' + isbn, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('ireader-bearer')
        },
    });

    if (response.status === 401) {
        cookies.delete('ireader-bearer', { path: '/' });
        error(403);
    }

    if (response.status === 200) {
        return new Response(null, {
            status: 200,
        });
    } else {
        return new Response(await response.json(), {
            status: 400,
        });
    }
}