<script>
    import ReadForm from "$lib/components/form/ReadForm.svelte";
    import {goto} from "$app/navigation";

    export let data;

    const redirectToCompleted = () => {
        goto('/books/completed');
    }
</script>

<svelte:head>
    <title>Отзыв</title>
</svelte:head>

<h1>
    Здесь вы можете оставить отзыв о книге
</h1>
<div>
    <ReadForm book={data.book} />
    <button class="btn btn-lg btn-accent" on:click={redirectToCompleted}>Не оставлять</button>
</div>