<script lang="ts">
    import BookCard from "$lib/components/card/BookCard.svelte";
    import AdminBookCardButton from "$lib/components/misc/AdminBookCardButton.svelte";
    import ModalDelete from "$lib/components/misc/ModalDelete.svelte";
    import BookCardButtons from "$lib/components/misc/BookCardButtons.svelte";
    import { user } from "$lib/stores/user-store";
    import FeedbackButton from "$lib/components/misc/FeedbackButton.svelte";
    import {formatDate} from "$lib/helpers/helpers.js";

    export let data: object;
    let book: object;
    $: book =  data.book.data;

    let bookToDelete: object|null = null;
    let authorized: boolean = false;
    let completedBook: object;

    $: completedBook = null;

    $: if ($user) {

        if ($user.completed) {
            let completedBook = $user.completed.data.find(b => b.isbn === book.isbn);
            if (completedBook) {
                book.review = completedBook.review;
                book.finished_at = completedBook.finished_at;
                book.user_rate = completedBook.user_rate;
                console.log(book);
            }
        }
        if ($user.currentUser?.data.admin) {
            authorized = true;
        } else {
            authorized = false;
        }
    }

</script>

<svelte:head>
    <title>{book.title}</title>
</svelte:head>

<div class="flex m-auto w-[300px] sm:w-[800px] bg-accent-content/10 mb-6">
    <BookCard {book} pageType="main" />
    {#if $user.currentUser}
        <div class="relative flex items-center flex-col p-2">
            <div class="right-5 absolute">
                <BookCardButtons isbn={book.isbn} singleBook={book} />
            </div>
            {#if authorized}
            <div class="mt-auto">
                <AdminBookCardButton isbn={book.isbn} title={book.title} bind:bookToDelete />
            </div>
            {/if}
        </div>
    {/if}
</div>

{#if book.finished_at}
<div class="bg-red-100 m-auto flex flex-col text bg-base-200 p-4 min-h-[210px] w-[250px] md:w-[800px] rounded shadow-xl">
    {#if book?.finished_at}
    <p class="mb-2">Прочитано: <span>{book.finished_at ? formatDate(book.finished_at) : ''}</span></p>
    {/if}
    {#if book?.user_rate}
        <p class="mb-2">Ваша оценка: <span class="text-error">{book.user_rate}</span></p>
    {/if}
    {#if book.review}
        <h3 class="mb-4">Ваш отзыв:</h3>
        <p class="text-md mb-2">
            {book.review}
        </p>
    {:else}
        <p class="mb-2">Нет отзыва</p>
    {/if}
    <div class="mt-auto">
        <FeedbackButton isNew={book.review ? false : true} isbn={book.isbn} />
    </div>
</div>
{/if}


{#if bookToDelete}
    <ModalDelete redirect bind:bookToDelete />
{/if}