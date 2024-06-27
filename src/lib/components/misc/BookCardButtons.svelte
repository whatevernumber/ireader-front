<script lang="ts">
    import {user} from "$lib/stores/user-store";

    export let isbn: string;
    export let bookIndex: number;
    export let singleBook: object;
    export let books: object;
    export let type: string;

$:    console.log($user);

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
        })

        if (res.status === 204) {
            bookIndex = $user.progress.data.findIndex((element) => element.isbn === isbn);
            $user.progress.data.splice(bookIndex, 1);
            $user = $user;

            if (type === 'read') {
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
            <img src="/img/svg/purchased.svg" class="w-6" alt="Иконка пакета">
            <span class="text-sm">Прочитано</span>
        </div>
        <div class="flex gap-x-1 items-center">
            <img src="/img/svg/purchased.svg" class="w-6" alt="Иконка пакета">
            <span class="text-sm">Убрать из прочитанного</span>
        </div>
    {:else}
        <span class="btn btn-sm btn-square btn-ghost btn-primary hover:btn-outline" on:click={deleteFromFavs}>
            <span>
                Отметить прочитанным
            </span>
            <img src="/img/svg/happy-heart.svg" class="w-6" alt="Иконка закрашенного сердечка">
        </span>
        {#if saved}
        <span class="btn btn-sm btn-square btn-ghost btn-primary hover:btn-outline" on:click={deleteFromFavs}>
            <img src="/img/svg/happy-heart.svg" class="w-6" alt="Иконка закрашенного сердечка">
        </span>
        {:else}
        <span class="btn btn-sm btn-square btn-ghost" on:click={addToFavs}>
            <img src="/img/svg/heart.svg" class="w-6" alt="Иконка незакрашенного сердечка">
        </span>
        {/if}
        {#if added}
        <span class="btn btn-sm btn-square btn-outline btn-primary" on:click={deleteFromProgress}>
            <img src="/img/svg/cart-check.svg" class="w-6" alt="Иконка корзины">
        </span>
        {:else}
         <span class="btn btn-sm btn-square btn-ghost" on:click={addToProgress}>
            <img src="/img/svg/cart-plus.svg" class="w-6" alt="Иконка корзины">
         </span>
        {/if}
    {/if}
</div>