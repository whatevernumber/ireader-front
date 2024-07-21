<script lang="ts">
    import BookCard from "$lib/components/card/BookCard.svelte";
    import BookCardButtons from "$lib/components/misc/BookCardButtons.svelte";
    import {user} from "$lib/stores/user-store";
    import AdminBookCardButton from "$lib/components/misc/AdminBookCardButton.svelte";
    import Pagination from "$lib/components/misc/Pagination.svelte";
    import Search from "$lib/components/misc/Search.svelte";
    import ErrorFace from "$lib/components/misc/ErrorFace.svelte";
    import SmallBookCard from "../lib/components/card/SmallBookCard.svelte";

    export let data: object;
    let completedBooksData: object;
    let completedBooks: object;
    let progressBooks: object;

    completedBooksData = data.completed_books;
    completedBooks = data.completed_books?.data;
    progressBooks = data.in_progress?.data;

    let authorized: boolean;

    let bookToDelete: string|null = null;

    let isbnToComplete: string = null; // used for modal to show review form after a book marked as completed

    // if redirected from registered page, show login form
    if (data.login) {
        login_modal.showModal();
    }

    $: if ($user) {
        if ($user.currentUser?.data?.admin) {
            authorized = true;
        } else {
            authorized = false;
        }
    }

</script>

<svelte:head>
    <title>iBook</title>
</svelte:head>

<div class="flex justify-center gap-x-16 mb-6">
    <div class="flex flex-col items-center w-[300px] sm:w-[700px]">
        <div class="sm:hidden">
            <a>
                <img class="w-[100px] h-[60px]" src="/img/svg/logo_prepared.svg">
            </a>
        </div>
        <div class="flex flex-col gap-y-4 self-center mb-6">
            <Search />
        </div>
        {#if data.authorized && progressBooks && progressBooks.length}
            <div class="w-4/5 m-auto mb-8 p-4">
                <div class="mt-4">
                    <h2 class="text-center mb-6 text-primary font-[Lobster] text-[2rem] tilted">Сейчас я читаю:</h2>
                    <div class="flex flex-col items-center justify-center gap-y-6 gap-x-6 sm:flex-row">
                        {#each progressBooks as book, index}
                            {#if index < 4}
                                <div class="relative">
                                    <SmallBookCard {book} />
                                    <div class="flex justify-center bg-info p-2">
                                        <BookCardButtons isbn={book.isbn} bookIndex={index} singleBook={book} bind:books={progressBooks} type="main" />
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
        {#if data.authorized && completedBooks && completedBooks.length}
            <h2 class="text-accent text-center text-lg mt-4 mb-6 font-[Lobster] text-[2rem] tilted">Прочитано</h2>
        <ul class="flex flex-col flex-wrap gap-y-10 min-h-[600px]">
            {#each completedBooks as book, index (book.isbn)}
            <li class="card card-bordered bg-base-200 shadow-xl w-[280px] sm:w-[700px] relative">
                <BookCard {book} />
                {#if $user.currentUser}
                <div class="absolute right-40 bottom-10">
                    <BookCardButtons isbn={book.isbn} bookIndex={index} singleBook={book} type="finished" bind:books={completedBooks} bind:booksData={completedBooksData} />
                </div>
                    {#if authorized}
                <div class="absolute right-2 top-2">
                    <AdminBookCardButton isbn={book.isbn} title={book.title} bookIndex={index} bind:bookToDelete />
                </div>
                    {/if}
                    {#if book?.user_rate}
                        <div class="absolute bottom-2 left-4 flex flex-row gap-y-1">
                            <p class="text-sm text-accent-content/50 mr-2">Моя оценка:</p>
                            <div class="flex gap-x-2 items-center">
                                <img class="w-6" src="/img/svg/star-colored.svg" alt="Закрашенная звёздочка"> <span class="text-sm">x {Math.floor(book.user_rate)}</span>
                            </div>
                        </div>
                    {/if}
                {/if}
            </li>
            {/each}
        </ul>
            <div class="mt-4 self-center">
                <Pagination bind:data={completedBooksData} bind:list={completedBooks} pageType="completed" />
            </div>
        {:else if !data.authorized && data.random_books && data.random_books?.data.length}
            <h2 class="text-center text-xl text-primary mt-4 mb-4 uppercase font-[Lobster] text-[2rem] tilted">У нас читают</h2>
            <ul class="flex flex-col flex-wrap gap-y-10 min-h-[600px]">
                {#each data.random_books.data as book, index (book.isbn)}
                    <li class="card card-bordered bg-base-200 shadow-xl w-[280px] sm:w-[700px] relative">
                        <BookCard {book} />
                    </li>
                {/each}
            </ul>
        {:else}
            <ErrorFace errorText="Пока здесь ничего нет. Начните читать сейчас!" />
        {/if}
    </div>
</div>

<!--<ModalDelete bind:bookToDelete bind:booksData={completedBooksData} bind:books={completedBooks} currentPage="page"/>-->


