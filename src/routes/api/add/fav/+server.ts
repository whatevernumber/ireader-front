import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function POST({url, cookies}) {

    const isbn: string|null = url.searchParams.get('isbn');

    if (!isbn) {
        error(400);
    }

    if (!cookies.get('ireader-bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/favourites/' + isbn, {
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
        // return json({'status': 200})
        return new Response(null, {
            status: 200,
        });
    } else {
        return new Response(null, {
            status: 400,
        });
    }
}