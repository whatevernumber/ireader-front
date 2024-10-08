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

    const token: string = 'Bearer ' + result.data.token;
    let expDate: Date = new Date();
    expDate.setMonth(expDate.getMonth() + 1);
    cookies.set('ireader-bearer', token, { path: '/', expires: expDate });
    cookies.set('id', result.data.id, { path: '/', expires: expDate});

    return json({
        'user': {
            'id': result.data.id,
            'name': result.data.name,
            'email': result.data.email,
            'birthday': result.data.birthday,
        }
    });
}
