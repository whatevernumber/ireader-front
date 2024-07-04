<script lang="ts">
    import UserForm from "$lib/components/form/UserForm.svelte";
    import {user} from "$lib/stores/user-store";
    import {goto} from "$app/navigation";

    export let data: object;

    let authorized: boolean = false;

    $: if ($user.currentUser) {
        if ($user.currentUser.data.admin || $user.currentUser.data.id === data.user.data.id) {
            authorized = true;
        } else {
            goto('/');
        }
    }
</script>

<svelte:head>
    <title>{data.user.data.name} - редактирование</title>
</svelte:head>

{#if authorized}
    <UserForm editedUser={data.user.data} />
{/if}