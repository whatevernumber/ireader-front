<script lang="ts">
    import BookForm from "$lib/components/form/BookForm.svelte";
    import {goto} from "$app/navigation";
    import {user} from "$lib/stores/user-store";

    let authorized: boolean = false;

    $: if ($user.currentUser) {
        if ($user.currentUser.data.admin) {
            authorized = true;
        } else {
            goto('/');
        }
    }
</script>

<svelte:head>
    <title>Добавление книги</title>
</svelte:head>

{#if authorized}
    <BookForm />
{/if}