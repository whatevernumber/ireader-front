<script lang="ts">
    import ErrorFace from "$lib/components/misc/ErrorFace.svelte";
    import BookCardButtons from "$lib/components/misc/BookCardButtons.svelte";
    import Pagination from "$lib/components/misc/Pagination.svelte";
    import FeedbackButton from "$lib/components/misc/FeedbackButton.svelte";
    import CompletedBookCard from "$lib/components/card/CompletedBookCard.svelte";
    import {formatDate} from "$lib/helpers/helpers.js";

    export let data: object;

    let booksData: object = data.completed;
    let books: object = booksData.data;

</script>

<svelte:head>
    <title>Прочитанные</title>
</svelte:head>

<h1 class="title text-center text-lg mb-4">
    Прочитанные
</h1>
<div class="flex flex-col mb-6">
    {#if books.length}
    <div class="relative flex flex-col items-center justify-center gap-y-6 gap-x-6">
        {#each books as book, index (book.isbn)}
            {#if index < 5}
                <div class="relative flex flex-row">
                    <div class="relative">
                        <CompletedBookCard {book} />
                        <div class="absolute bottom-2 right-2">
                            <BookCardButtons isbn={book.isbn} bookIndex={index} singleBook={book} bind:books type="finished" bind:booksData smallCard />
                        </div>
                        <div class="bg-accent-content/20 rounded sm:bg-inherit md:absolute md:top-0 md:right-[-320px] flex flex-col gap-y-4 w-[300px] p-2">
                            <div class="flex gap-x-4 items-center">
                                {#if book.user_rate}
                                    <div class="stats">
                                        <div class="stat">
                                            <div class="stat-title mb-1">Оценка</div>
                                            <div class="stat-value text-center">{book.user_rate}</div>
                                        </div>
                                    </div>
                                {/if}
                                {#if book.completion_days}
                                    <div class="stats">
                                        <div class="stat">
                                            <div class="stat-title mb-1">Дней затрачено</div>
                                            <div class="stat-value text-center">{book.completion_days}</div>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                            <div class="stat-desc text-center">Завершено: {book.finished_at ? formatDate(book.finished_at) : ''}</div>
                            {#if book.review}
                                <div class="text-center">
                                    <a href="{'/books/' + book.isbn}" class="link-secondary text-center cursor-pointer">Посмотреть отзыв</a>
                                </div>
                            {:else}
                                <div class="text-center">
                                    <FeedbackButton isNew={true} isbn={book.isbn} />
                                </div>
                            {/if}
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