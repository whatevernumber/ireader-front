<script lang="ts">
    import {goto} from "$app/navigation";

    export let isbn: string;
    export let bookIndex: number;
    export let title: string;
    export let bookToDelete: object|null = null;

    const editBook = (): void => {
        goto(`/admin/books/edit/${isbn}`);
    }

    function markToDelete(): void {
        bookToDelete = {
            isbn: isbn,
            index: bookIndex,
            title: title,
        }

        book_delete_modal.showModal();
    }
</script>

<div class="flex gap-x-2">
    <span class="btn btn-xs btn-square btn-ghost" on:click={markToDelete}>
        <img src="/img/svg/delete-bin.svg" class="w-5" alt="Иконка мусорной корзины">
    </span>
    <span class="btn btn-xs btn-square btn-ghost" on:click={editBook}>
        <img src="/img/svg/pen.svg" class="w-4" alt="Иконка карандаша">
    </span>
</div>

