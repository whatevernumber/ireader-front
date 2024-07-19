<script lang="ts">
    import {goto} from '$app/navigation';
    import AutoComplete from "simple-svelte-autocomplete";

    export let books: object;
    export let selectedBook: object;
    export let type: string = 'main';

    const search = () => {
        if (selectedBook) {
            goto('/books/' + selectedBook.id)
        }
    }

    const getOptions = async (keyword: string): Promise<object> => {
        const response: Response = await fetch('/api/books/search?keyword=' + keyword, {
            method: 'GET',
        });

        return await response.json();
    }

</script>

<search>
    <AutoComplete placeholder="Сегодня я прочитал..." searchFunction={getOptions} bind:selectedItem="{selectedBook}" delay="400" hideArrow inputClassName="input input-bordered input-warning mr-1 {type === 'main' ? 'h-16  sm:w-[200px] md:w-[300px] lg:w-[500px]' : 'sm:w-[200px] xl:w-[350px]'}"
                  loadingText='Ищем книги...' dropdownClassName=" {type === 'main' ? 'sm:max-w-[200px] md:max-w-[300px] lg:max-w-[500px]' : 'sm:max-w-[200px] xl:max-w-[350px]'}" localFiltering={false}  noResultsText="Нет результатов" onChange={search} labelFunction={book => '"' + book.title + '", ' + book.name} noInputStyles
    />
</search>

<style>
</style>