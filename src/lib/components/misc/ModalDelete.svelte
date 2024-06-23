<script lang="ts">
    import {goto} from "$app/navigation";
    import {user} from "$lib/stores/user-store";

    export let redirect: boolean = false;
    export let bookToDelete: object;
    export let books: object;
    export let booksData: object;

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
                let res: Response = await fetch('/api/books?page=' + (currentPage--) , {
                    method: 'GET',
                });

                if (res.status === 200) {
                    const result: object = await res.json();
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