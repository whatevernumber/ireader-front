import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function POST({ url, cookies, request }): Promise<Response> {

    let isbn: string = url.searchParams.get('isbn');
    const formData: FormData = await request.formData();
    formData.append('_method', 'PATCH');

    if (!isbn) {
        error(400);
    }

    if (!cookies.get('bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/completed/update/' + isbn, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('bearer')
        },
        body: formData,
    });

    if (response.status === 401) {
        cookies.delete('bearer', { path: '/' });
        error(403);
    }

    console.log(response.status);

    if (response.status === 201) {
        return new Response(null, {
            status: 201,
        });
    } else {
        return json(await response.json());
    }
}