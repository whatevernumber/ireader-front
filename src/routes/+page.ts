
export async function load({url, fetch}) {

    let text: string = url.searchParams.get('text') ?? null;
    let query: string = '';
    let login: string = url.searchParams.get('login') ?? null;

    if (text) {
        query = `?text=${text}`;
    }

    let res: Response = await fetch(`/api/books${query}`, {
        method: 'GET',
        headers: {
            accept: 'application/json'
        },
    });

    const books: object = await res.json();

    let genresRes: Response = await fetch('/api/genres', {
        method: 'GET',
        headers: {
            accept: 'application/json'
        },
    });

    const genres: object = await genresRes.json();

    return {
        books: books,
        genres: genres,
        query: text,
        login: login,
    };
}