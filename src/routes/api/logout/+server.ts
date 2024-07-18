import {_SERVER} from '$env/static/private';

export async function POST({cookies}) {

    const response: Response = await fetch(_SERVER + '/logout', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('ireader-bearer'),
        },
    });

    if (response.status === 200) {
        cookies.delete('ireader-bearer', {path: '/'});
        cookies.delete('id', {path: '/'});
        return new Response(null, {
            status: 200,
        })
    } else {
        return new Response(null, {
            status: 400,
        })
    }
}
