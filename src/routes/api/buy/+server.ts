import {_SERVER} from '$env/static/private';
import {error} from '@sveltejs/kit';

export async function POST({ url, cookies }): Promise<Response> {

    const bonus: string|null = url.searchParams.get('bonus');
    let query: string = '';

    if (!cookies.get('bearer')) {
        error(403);
    }

    if (bonus) {
        query = '/' + bonus;
    }

    const response: Response = await fetch(_SERVER + '/purchase' + query, {
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