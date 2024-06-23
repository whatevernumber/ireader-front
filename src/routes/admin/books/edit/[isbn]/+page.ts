import {error} from "@sveltejs/kit";

export async function load({params, fetch}) {

    let isbn: string = params.isbn;

    if (!isbn) {
       throw error(404)
    }

    const res: Response = await fetch(`/api/book?isbn=${isbn}`, {
        method: 'GET',
        headers: {
            accept: 'application/json'
        },
    });

    if (res.status === 404) {
        throw error(404);
    }

    const data: object = await res.json();

    return {
        book: data,
    };
}