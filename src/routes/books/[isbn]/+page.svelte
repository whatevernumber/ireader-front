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

    $: if ($user) {
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

{#if bookToDelete}
    <ModalDelete redirect bind:bookToDelete />
{/if}