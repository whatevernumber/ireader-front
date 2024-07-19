<script lang="ts">
    import {PUBLIC_STORAGE} from "$env/static/public";

    export let book: object;

</script>

<div class="card-body min-h-[300px] sm:w-[250px] md:w-[350px] lg:w-[520px] p-8 flex-column justify-center grow-0 gap-x-8 shadow-[-4px_4px_12px_2px_#999] bg-accent-content/10 rounded-lg">
    <h2 class="card-title text-left hover:text-accent mb-2">
        <a href={'/books/' + book.isbn}>
            {book.title}
        </a>
    </h2>
    <div class="lg:w-[450px] sm:w-[200px] md:w-[300px] flex flex-col sm:flex-row justify-between">
        <div class="flex sm:mr-4">
            <a href={'/books/' + book.isbn}>
                <img src={book.image ? PUBLIC_STORAGE + book.image.image : '/img/temp-book.jpg'} class="w-[140px] h-[180px] object-contain">
            </a>
        </div>
        <div class="flex flex-col gap-y-2">
            <div class="flex flex-col mb-4">
                <p class="text-md font-bold pl-4">Авторы:</p>
                <ul>
                    {#each book.authors as author}
                        <li>
                            <p class="text-sm">{author.name}</p>
                        </li>
                    {/each}
                </ul>
            </div>
            <div class="flex flex-col">
                <p class="text-md font-bold pl-4">Жанры</p>
                <ul>
                    {#each book.genres as genre}
                        <li>
                            <p class="text-sm">{genre.value}</p>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
</div>
