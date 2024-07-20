<script lang="ts">
    import ErrorFace from "$lib/components/misc/ErrorFace.svelte";
    import BookCardButtons from "$lib/components/misc/BookCardButtons.svelte";
    import Pagination from "$lib/components/misc/Pagination.svelte";
    import FeedbackButton from "$lib/components/misc/FeedbackButton.svelte";
    import CompletedBookCard from "$lib/components/card/CompletedBookCard.svelte";
    import {formatDate} from "$lib/helpers/helpers.js";
    import BookReviewCard from "../../../lib/components/card/BookReviewCard.svelte";
    import { flip } from 'svelte/animate';
    import { slide, fly } from 'svelte/transition';
    import {quintOut} from "svelte/easing";

    export let data: object;

    let booksData: object = data.completed;
    let books: object = booksData.data;
    let showReview = false;

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
                <div animate:flip={{ duration: 200, easing: quintOut }} class="relative flex flex-row">
                    <div class="flex flex-col flex-col-reverse md:block relative">
                        <div class="relative">
                            {#if showReview === book.isbn}
                                <BookReviewCard {book} />
                                {:else}
                                <CompletedBookCard {book} />
                                <div class="absolute top-2 right-2">
                                    <BookCardButtons isbn={book.isbn} bookIndex={index} singleBook={book} bind:books type="finished" bind:booksData smallCard />
                                </div>
                            {/if}
                            <div class="sm:hidden mt-4 mb-4 stat-desc text-center">Завершено: {book.finished_at ? formatDate(book.finished_at) : ''}</div>
                            {#if book.review}
                                <div class="sm:hidden text-center">
                                    <span class="btn btn-secondary text-center cursor-pointer" on:click={() => {showReview === book.isbn ? showReview = false : showReview = book.isbn}}>{showReview === book.isbn ? 'Скрыть отзыв' : 'Посмотреть отзыв'}</span>
                                </div>
                            {:else}
                                <div class="sm:hidden text-center">
                                    <FeedbackButton isNew={true} isbn={book.isbn} />
                                </div>
                            {/if}
                        </div>
                        <div class="md:absolute md:top-0 md:right-[-320px] flex flex-col gap-y-4 sm:w-[250px] md:w-[300px] p-2">
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
                            <div class="hidden sm:block stat-desc text-center">Завершено: {book.finished_at ? formatDate(book.finished_at) : ''}</div>
                            {#if book.review}
                                <div class="hidden sm:block text-center">
                                    <span class="btn btn-secondary text-center cursor-pointer" on:click={() => {showReview === book.isbn ? showReview = false : showReview = book.isbn}}>{showReview === book.isbn ? 'Скрыть отзыв' : 'Посмотреть отзыв'}</span>
                                </div>
                            {:else}
                                <div class="hidden sm:block text-center">
                                    <FeedbackButton isNew={true} isbn={book.isbn} />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
        {/each}
    </div>
    <div class="mt-4 self-center">
        <Pagination bind:data={booksData} bind:list={books} pageType="completed" />
    </div>
    {:else}
        <ErrorFace errorText="Тут пока пусто. Прочтите что-нибудь!" />
    {/if}
</div>