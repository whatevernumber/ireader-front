import {error, redirect} from "@sveltejs/kit";

export async function load({fetch, params}) {

    if (!params.isbn) {
        redirect(308, '/');
    }

    const res = await fetch('/api/user/completed');

    if (res.status === 403) {
        error(403);
    }

    const completedBooks = await res.json();

    let book = completedBooks.filter((book) => book.isbn === params.isbn);

    if (!book) {
        throw error(404);
    }

    return {
        book: book,
    };
}