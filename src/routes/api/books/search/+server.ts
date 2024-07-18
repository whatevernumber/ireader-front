import {_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url}) {

    const text: string = url.searchParams.get('keyword');

    if (!text) {
        error(400);
    }

    const res: Response = await fetch(`${_SERVER}/query/` + text, {
        headers: {
            accept: 'application/json'
        },
    });

    const data: object = await res.json();

    return json(data);
}