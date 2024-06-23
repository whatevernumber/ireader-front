import {_SERVER} from '$env/static/private';

export async function POST({cookies}) {

    const response: Response = await fetch(_SERVER + '/logout', {
        method: 'POST',
        headers: {
            accept: 'application/json',
            authorization: cookies.get('bearer'),
        },
    });

    if (response.status === 200) {
        cookies.delete('bearer', {path: '/'});
        return new Response(null, {
            status: 200,
        })
    } else {
        return new Response(null, {
            status: 400,
        })
    }
}
