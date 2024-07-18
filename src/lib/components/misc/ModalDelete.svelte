<script lang="ts">
    import {goto} from "$app/navigation";
    import {user} from "$lib/stores/user-store";
    import {loadMoreBooks} from "$lib/helpers/helpers";

    export let redirect: boolean = false;
    export let bookToDelete: object;
    export let books: object;
    export let booksData: object;

    console.log(booksData)
    export let data: object;

    let currentPage = booksData.books.meta?.currentPage;

    const deleteBook = async (): Promise<void> => {
        let res: Response = await fetch('/api/delete/book?isbn=' + bookToDelete.isbn , {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            },
        });

        if (res.status === 403) {
            $user = {};
            goto('/')
        }

        if (res.status === 204) {
            if (redirect) {
                goto('/');
            }

            books.splice(bookToDelete.index, 1);

            if (!books.length && currentPage !== 1) {
                let result: object = await loadMoreBooks(currentPage--, 'books')
                if (result) {
                    booksData.books = result;
                    books = result.data;
                }
            }

            books = books;
            book_delete_modal.close();
        }
    }

</script>

<dialog id="book_delete_modal" class="modal">
    <div class="modal-box">
        <p>Вы собираетесь удалить книгу <span class="font-bold">{bookToDelete?.title}</span>. Это действие <span class="font-bold">необратимо</span>!</p>
        <div class="flex justify-between mt-2">
            <a class="btn btn-accent" on:click={deleteBook}>
                Удалить
            </a>
            <a class="btn btn-error" on:click={() => book_delete_modal.close()}>Не удалять</a>
        </div>
    </div>
</dialog>