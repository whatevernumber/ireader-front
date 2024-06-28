<script lang="ts">
    import {user} from "$lib/stores/user-store";

    export let isbn: string;
    export let bookIndex: number;
    export let singleBook: object;
    export let books: object;
    export let type: string;

    let read: boolean = false;
    let added: boolean = false;
    let saved: boolean = false;

    const addToProgress = async (): Promise<void> => {
        let res: Response = await fetch('/api/add/progress?isbn=' + isbn, {
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
        })
        if (res.status === 200) {
            $user.progress.data.push(singleBook);
            $user = $user;

            if (type === 'fav') {
                await deleteFromFavs();
            }
        }
    }

    const addToFavs = async (): Promise<void> => {
        let res: Response = await fetch('/api/add/fav?isbn=' + isbn, {
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
        })
        if (res.status === 200) {
            $user.favs.data.push(singleBook);
            $user = $user;
        }
    }

    const deleteFromFavs = async (): Promise<void> => {
        let res: Response = await fetch('/api/delete/fav?isbn=' + isbn, {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            },
        })

        if (res.status === 204) {
           bookIndex = $user.favs.data.findIndex((element) => element.isbn === isbn);

           $user.favs.data.splice(bookIndex, 1);
           $user = $user;

           if (type === 'fav') {
                books.splice(bookIndex, 1);
                books = books;
           }
        }
    }

    const deleteFromProgress = async (): Promise<void> => {
        let res: Response = await fetch('/api/delete/progress?isbn=' + isbn , {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            },
        });

        if (res.status === 204) {
            bookIndex = $user.progress.data.findIndex((element) => element.isbn === isbn);
            $user.progress.data.splice(bookIndex, 1);
            $user = $user;

            if (type === 'progress') {
                books.splice(bookIndex, 1);
                books = books;
            }
        }
    }

    const markedAsCompleted = async (): Promise<void> => {
        let res: Response = await fetch('/api/book/complete?isbn=' + isbn, {
            method: 'POST',
            headers: {
                accept: 'application/json'
            },
        });

        if (res.status === 200) {
            $user.completed.data.push(singleBook);
            $user = $user;

            if (type === 'fav') {
                await deleteFromFavs();
            }

            // removes book from progress if it's there
            bookIndex = $user.progress.data.findIndex((element) => element.isbn === isbn);

            if (bookIndex || bookIndex === 0) {
                $user.progress.data.splice(bookIndex, 1);
                $user = $user;
            }

            // if current page is progress page, updates the list
            if (type === 'progress') {
                books.splice(bookIndex, 1);
                books = books;
            }
        }
    }

    const deleteFromCompleted = async (): Promise<void> => {
        let res: Response = await fetch('/api/delete/completed?isbn=' + isbn , {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            },
        });

        if (res.status === 204) {
            bookIndex = $user.completed.data.findIndex((element) => element.isbn === isbn);
            $user.completed.data.splice(bookIndex, 1);
            $user = $user;

            if (type === 'finished') {
                books.splice(bookIndex, 1);
                books = books;
            }
        }
    }

    $: read = $user.completed ? $user.completed.data.some((elem) => elem.isbn === isbn) : false;
    $: saved = $user.favs ? $user.favs.data.some((elem) => elem.isbn === isbn) : false;
    $: added = $user.progress ? $user.progress.data.some((elem) => elem.isbn === isbn) : false;

</script>

<div class="flex gap-x-2">
    {#if read}
        <div class="flex gap-x-1 items-center">
            <a class="btn btn-sm btn-square btn-ghost btn-primary hover:btn-outline" on:click={deleteFromCompleted}>
                <img src="/img/svg/book-colored.svg" class="w-6" alt="Иконка закрашенной книги">
            </a>
            <span class="text-sm">Прочитано</span>
        </div>
    {:else}
        <a class="btn btn-sm btn-square btn-ghost btn-primary hover:btn-outline" on:click={markedAsCompleted}>
            <img src="/img/svg/book-sparkles.svg" class="w-6" alt="Иконка книжки со звёздочками">
        </a>
        {#if saved}
        <a class="btn btn-sm btn-square btn-ghost btn-primary hover:btn-outline" on:click={deleteFromFavs}>
            <img src="/img/svg/happy-heart.svg" class="w-6" alt="Иконка закрашенного сердечка">
        </a>
        {:else}
        <a class="btn btn-sm btn-square btn-ghost" on:click={addToFavs}>
            <img src="/img/svg/heart.svg" class="w-6" alt="Иконка незакрашенного сердечка">
        </a>
        {/if}
        {#if added}
        <a class="btn btn-sm btn-square btn-outline btn-primary" on:click={deleteFromProgress}>
            <img src="/img/svg/book-open-black.svg" class="w-6" alt="Иконка закрашенной открытой книги">
        </a>
        {:else}
         <a class="btn btn-sm btn-square btn-ghost" on:click={addToProgress}>
            <img src="/img/svg/book-open-trans.svg" class="w-6" alt="Иконка незакрашенной открытой">
         </a>
        {/if}
    {/if}
</div>