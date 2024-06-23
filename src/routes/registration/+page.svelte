<script lang="ts">
    import UserForm from "$lib/components/form/UserForm.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    export let data: object;

    let allowed: boolean = false;

    onMount(() => {
        if (data.authorized) {
            goto('/');
        }
    });
</script>

{#if allowed}
    <UserForm />
{/if}