<script lang="ts">
    import BookForm from "$lib/components/form/BookForm.svelte";
    import {user} from "$lib/stores/user-store";

    export let data: object;

    let authorized: boolean = false;

    $: if ($user) {
        if ($user.currentUser?.data.admin) {
            authorized = true;
        }
    }
</script>

<svelte:head>
    <title>Редактирование книги</title>
</svelte:head>

{#if authorized}
    <BookForm book={data.book.data} />
{/if}