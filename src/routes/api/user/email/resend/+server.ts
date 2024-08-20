import {_SERVER} from '$env/static/private';
import {error, json} from '@sveltejs/kit';

export async function POST({cookies}) {

    if (!cookies.get('ireader-bearer')) {
        error(403);
    }

    const response: Response = await fetch(_SERVER + '/email/verify/resend', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('ireader-bearer')
        },
    });

    if (response.status === 401) {
        cookies.delete('ireader-bearer', { path: '/' });
        cookies.delete('id', { path: '/' });
        error(403);
    }

    return json({}, { status: response.status });
}