import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function PATCH({request, url, cookies}) {

    const id: string|null = url.searchParams.get('id');

    if (!id) {
        error(400);
    }

    if (!cookies.get('bearer')) {
        error(403);
    }

    const data: FormData = await request.formData();
    data.append('_method', 'PATCH');

    const response: Response = await fetch(_SERVER + '/users/' + id, {
        method: "POST",
        headers: {
            accept: 'application/json',
            authorization: cookies.get('bearer'),
        },
        body: data,
    });

    if (response.status === 401) {
        cookies.delete('bearer', { path: '/' });
        error(403);
    }

    const result: object = await response.json();

    return json(result);
}