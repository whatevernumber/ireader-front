<script lang="ts">
    export let data: object;

    export let list: object;

    const loadNewData = async (type: string) => {

        let newPage: number = data.meta.current_page;

        switch (type) {
            case 'prev':
                newPage--;
                break;
            case 'next':
                newPage++;
                break;
        }

        const response: Response = await fetch('/api/books?page=' + newPage, {
            method: 'GET',
        });

        if (response.ok) {
            let result = await response.json();
            data = result;
            list = result.data;
        }
    }
</script>

<div class="flex gap-x-1 items-center">
    {#if data.links.prev}
        <a class="btn btn-sm" on:click={() => loadNewData('prev')}>Назад</a>
    {/if}
    <p class="btn btn-sm btn-disabled">{data.meta.current_page}</p>
    {#if data.links.next}
        <a class='btn btn-sm' on:click={() => loadNewData('next')}>Следующая</a>
        <div class="ml-5">
            <p class="text-xs">Всего страниц: <span>{data.meta.last_page}</span></p>
        </div>
    {/if}
</div>