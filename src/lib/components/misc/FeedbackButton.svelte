<script lang="ts">
    import { goto } from '$app/navigation';

    export let isNew: boolean = false;
    export let isbn: string;
</script>

<span class="btn btn-sm btn-primary" on:click={goto('/books/feedback/' + isbn)}>
    {isNew ? 'Оставить отзыв' : 'Редактировать отзыв'}
</span>