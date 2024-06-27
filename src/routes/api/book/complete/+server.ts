import {_SERVER} from '$env/static/private';
import {error} from '@sveltejs/kit';

export async function POST({ url, cookies }): Promise<Response> {

    let isbn: string = url.searchParams.get('id');

    if (!isbn) {
        error(400);
    }

    if (!cookies.get('bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/completed/' + isbn, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('bearer')
        },
    });

    if (response.status === 401) {
        cookies.delete('bearer', { path: '/' });
        error(403);
    }

    if (response.status === 200) {
        return new Response(null, {
            status: 200,
        });
    } else {
        return new Response(null, {
            status: 400,
        });
    }
}