<script lang="ts">
    import BookCard from "$lib/components/card/BookCard.svelte";
    import BookCardButtons from "$lib/components/misc/BookCardButtons.svelte";
    import ErrorFace from "$lib/components/misc/ErrorFace.svelte";
    import Pagination from "$lib/components/misc/Pagination.svelte";

    export let data: object;

    let booksData: object = data.progress;
    let books: object = booksData.data;
    let error: boolean = false;

</script>

<svelte:head>
    <title>Список чтения</title>
</svelte:head>

<h1 class="title text-center text-lg mb-4">
    В процессе чтения
</h1>
<div class="flex flex-col mb-6 min-h-[600px]">
    {#if books.length}
        <ul class="flex flex-col flex-wrap gap-y-10">
            {#each books as book, index}
                <li class="card card-bordered bg-base-200 shadow-xl w-[300px]  sm:w-[700px] m-auto">
                    <BookCard {book} />
                    <div class="absolute right-40 bottom-10">
                        <BookCardButtons isbn={book.isbn} bookIndex={index} singleBook={book} bind:books type="progress" bind:booksData={booksData} />
                    </div>
                </li>
            {/each}
        </ul>
        <div class="mt-4 self-center">
            <Pagination bind:data={booksData} bind:list={books} />
        </div>
    {:else}
        <ErrorFace errorText="Вы не читаете книжки" />
    {/if}
</div>