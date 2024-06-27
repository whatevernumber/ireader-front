import {_SERVER} from '$env/static/private';
import { json, error } from '@sveltejs/kit';

export async function POST({request, cookies}) {

    const data: FormData = await request.formData();

    const response: Response = await fetch(_SERVER + '/login', {
        method: 'POST',
        headers: {
            accept: 'application/json'
        },
        body: data,
    });

    const result: object = await response.json();

    if (result.errors) {
        return json(result);
    }

    const token = 'Bearer ' + result.data.token;
    cookies.set('bearer', token, { path: '/'});
    cookies.set('id', result.data.id, { path: '/'});

    return json({
        'user': {
            'id': result.data.id,
            'name': result.data.name,
            'email': result.data.email,
            'birthday': result.data.birthday,
        }
    });
}
