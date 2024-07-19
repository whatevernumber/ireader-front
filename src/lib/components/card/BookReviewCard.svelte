<script lang="ts">
    import {PUBLIC_STORAGE} from "$env/static/public";
    import {formatDate} from "../../helpers/helpers.js";
    import FeedbackButton from "$lib/components/misc/FeedbackButton.svelte";

    export let book: object;
</script>

<div class="card-body min-h-[300px] w-[300px] md:w-[700px] p-8 flex justify-center grow-0 gap-x-8 shadow-[-4px_4px_12px_2px_#999] bg-accent-content/10 rounded-lg">
    <div class="flex flex-col md:flex-row">
        <div class="flex flex-col w-[250px]">
            <h2 class="card-title text-left hover:text-accent mb-2">
                <a href={'/books/' + book.isbn}>
                    {book.title}
                </a>
            </h2>
            <div class="lg:w-[200px] sm:w-[200px] flex flex-col justify-between">
                <div class="flex">
                    <a href={'/books/' + book.isbn}>
                        <img src={book.image ? PUBLIC_STORAGE + book.image.image : '/img/temp-book.jpg'} class="w-[140px] h-[180px] object-contain">
                    </a>
                </div>
                <div class="flex flex-col mb-4">
                    <p class="text-sm font-bold">Авторы:</p>
                    <ul>
                        {#each book.authors as author}
                            <li>
                                <p class="text-sm">{author.name}</p>
                            </li>
                        {/each}
                    </ul>
                </div>
                <div>
                    {#if book?.user_rate}
                        <div class="flex flex-col gap-y-1">
                            <p class="text-xs">Ваша оценка:</p>
                            <div class="flex gap-x-2 items-center">
                                <img class="w-6" src="/img/svg/star-colored.svg" alt="Закрашенная звёздочка"> <span class="text-sm">x {book.user_rate}</span>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-y-4">
            <p>
                {book.review}
            </p>
            <div class="self-end">
                <FeedbackButton isNew={false} isbn={book.isbn} />
            </div>
        </div>
    </div>
</div>
