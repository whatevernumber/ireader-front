<script lang="ts">
    import ErrorFace from "$lib/components/misc/ErrorFace.svelte";
    import BookCardButtons from "$lib/components/misc/BookCardButtons.svelte";
    import Pagination from "$lib/components/misc/Pagination.svelte";
    import FeedbackButton from "$lib/components/misc/FeedbackButton.svelte";
    import CompletedBookCard from "$lib/components/card/CompletedBookCard.svelte";

    export let data: object;

    let booksData: object = data.completed;
    let books: object = booksData.data;

    const formatDate = (stringDate: string) => {
        const date = new Date(stringDate);
        return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
    }

</script>

<svelte:head>
    <title>Прочитанные</title>
</svelte:head>

<h1 class="title text-center text-lg mb-4">
    Прочитанные
</h1>
<div class="flex flex-col mb-6">
    {#if books.length}
    <div class="relative flex flex-col items-center justify-center gap-y-6 gap-x-6 sm:flex-row">
        {#each books as book, index (book.isbn)}
            {#if index < 5}
                <div class="relative">
                    <CompletedBookCard {book} />
                    <div class="absolute bottom-1 right-2">
                        <BookCardButtons isbn={book.isbn} bookIndex={index} singleBook={book} bind:books type="finished" bind:booksData smallCard />
                    </div>
                </div>
                <div class="flex flex-col gap-y-4 min-h-[330px] p-2">
                    <div class="flex gap-x-4 items-center">
                        {#if book.completion_days}
                            <div class="stats shadow">
                                <div class="stat">
                                    <div class="stat-title">Дней затрачено</div>
                                    <div class="stat-value">{book.completion_days}</div>
                                </div>
                            </div>
                        {/if}
                        {#if book.user_rate}
                            <div class="stats shadow">
                                <div class="stat">
                                    <div class="stat-title">Оценка</div>
                                    <div class="stat-value">{book.user_rate}</div>
                                </div>
                            </div>
                        {/if}
                    </div>
                    <div class="flex flex-col text bg-base-200 p-4 min-h-[210px]">
                    {#if book.review}
                    <p class="text-sm">
                        {book.review}
                    </p>
                    {:else}
                        <p>Нет отзыва</p>
                    {/if}
                        <div class="stat-desc">Завершено: {book.finished_at ? formatDate(book.finished_at) : ''}</div>
                        <div class="mt-auto">
                            <FeedbackButton isNew={book.review ? false : true} isbn={book.isbn} />
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    <div class="mt-4 self-center">
        <Pagination bind:data={booksData} bind:list={books} pageType="completed" />
    </div>
    {:else}
        <ErrorFace errorText="Тут пока пусто. Прочтите что-нибудь!" />
    {/if}
</div>