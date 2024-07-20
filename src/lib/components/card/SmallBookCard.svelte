<script lang="ts">
    import {PUBLIC_STORAGE} from "$env/static/public";

    export let book: object;

</script>

<div class="card-body min-h-[430px] w-[250px] items-center flex-column grow-0 gap-x-8 shadow-xl bg-accent-content/10 px-8 py-6">
    <h2 class="card-title hover:text-accent mb-2 font-[Lobster]">
        <a href={'/books/' + book.isbn}>
            «{book.title}»
        </a>
    </h2>
    <div class="min-w-[100px]">
        <div class="flex flex-col gap-y-2">
            <a href={'/books/' + book.isbn}>
                <img src={book.image ? PUBLIC_STORAGE + book.image.image : '/img/temp-book.jpg'} class="w-[100px] h-[140px] object-cover">
            </a>
            <div class="flex flex-col my-2">
                <p class="text-sm font-bold">Авторы:</p>
                <ul>
                    {#each book.authors as author}
                        <li>
                            <p class="text-xs">{author.name}</p>
                        </li>
                    {/each}
                </ul>
            </div>
            <div class="flex flex-col my-2">
                <p class="text-sm font-bold">Жанр</p>
                <ul>
                    <!--{#each book.genres as genre}-->
                        <li>
                            <p class="text-xs">{book.genres[0].value}</p>
                        </li>
                    <!--{/each}-->
                </ul>
            </div>
        </div>
    </div>
</div>
