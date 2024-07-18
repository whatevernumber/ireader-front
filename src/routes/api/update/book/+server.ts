import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function PATCH({request, url, cookies}) {

    const isbn: string|null = url.searchParams.get('isbn');

    if (!isbn) {
        error(400);
    }

    if (!cookies.get('ireader-bearer')) {
        error(403);
    }

    const data: FormData = await request.formData();
    data.append('_method', 'PATCH');

    const response: Response = await fetch(_SERVER + '/books/' + isbn, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('ireader-bearer'),
        },
        body: data,
    });

    if (response.status === 401) {
        cookies.delete('ireader-bearer', { path: '/' });
        error(403);
    }

    const result: object = await response.json();

    return json(result);
}
