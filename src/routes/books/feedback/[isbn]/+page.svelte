<script>
    import ReadForm from "$lib/components/form/ReadForm.svelte";
    export let data;
</script>

<svelte:head>
    <title>Отзыв</title>
</svelte:head>

<h1 class="text-center text-lg">Форма отзыва</h1>
<p class="text-center p-2">Здесь вы можете оставить отзыв о прочитанной книге. Это необязательно.</p>
<div>
    <ReadForm book={data.book[0]} />
</div>