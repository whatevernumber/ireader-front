import {_SERVER} from '$env/static/private';
import {error} from '@sveltejs/kit';

export async function DELETE({url, cookies}) {

    const id: string|null = url.searchParams.get('id');

    if (!id) {
        error(400);
    }

    if (!cookies.get('ireader-bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/users/' + id, {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('ireader-bearer')
        },
    });

    if (response.status === 401) {
        error(403);
    }

    cookies.delete('ireader-bearer', { path: '/' });

    if (response.status === 204) {
        return new Response(null, {
            status: 204,
        })
    } else {
        return new Response(null, {
            status: 400,
        })
    }
}