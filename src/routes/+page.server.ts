export async function load({ url, fetch, cookies }) {

    let login: string = url.searchParams.get('login') ?? null;
    let inProgress: object = null;
    let completedBooks: object = null;
    let randomBooks: object = null;

    if (cookies.get('id')) {
        let response: Response = await fetch('/api/user/completed?page=1');
        completedBooks = await response.json();

        response = await fetch('/api/user/progress');
        inProgress = await response.json();
    } else {
        let response = await fetch('/api/books/random');
        randomBooks = await response.json();
    }

    return {
        in_progress: inProgress,
        completed_books: completedBooks,
        random_books: randomBooks,
        login: login,
    };
}