import {_SERVER} from '$env/static/private';
import { json} from '@sveltejs/kit';

export async function POST({request, cookies}) {

    const data: FormData = await request.formData();

    const response: Response = await fetch(_SERVER + '/register', {
        method: 'POST',
        headers: {
            accept: 'application/json'
        },
        body: data,
    });

    const result: object = await response.json();

    return json(result);
}