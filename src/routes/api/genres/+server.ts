import {_SERVER} from "$env/static/private";
import { json } from '@sveltejs/kit';

export async function GET() {

    const res: Response = await fetch(`${_SERVER}/genres`, {
        headers: {
            accept: 'application/json'
        },
    });

    const data: object = await res.json();

    return json(data);
}