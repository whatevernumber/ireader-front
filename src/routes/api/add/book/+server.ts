import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function POST({request, cookies}): Promise<object> {

    if (!cookies.get('ireader-bearer')) {
        error(403);
    }

    const data: FormData = await request.formData();

    const response: Response = await fetch(_SERVER + '/books/', {
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
