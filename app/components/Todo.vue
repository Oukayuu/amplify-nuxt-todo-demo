<template>
  <div
    tabindex="0"
    class="collapse bg-primary shadow-sm rounded-xl cursor-pointer mb-3 z-10"
    :class="isOpen ? 'collapse-open' : 'collapse-close'"
    @click.stop="isOpen = !isOpen"
  >
    <div class="collapse-title text-lg font-medium px-2">
      <div class="flex justify-between">
        <div class="flex w-full">
          <ChevronDownIcon v-if="isOpen" />
          <ChevronRightIcon v-else />
          <p class="text-primary" v-text="todo.title"></p>
        </div>
        <div class="flex items-center">
          <input
            class="checkbox checkbox-sm mx-2"
            :disabled="isArchive"
            type="checkbox"
            :checked="todo.done"
            @click.stop="doneToggleTodo({ id: todo.id, done: !todo.done })"
          />
          <div class="dropdown dropdown-left z-[10000]">
            <label>
              <MoreIcon
                class="cursor-pointer outline-none"
                tabindex="1"
                @click.stop
              />
            </label>
            <div
              tabindex="1"
              class="dropdown-content text-primary bg-primary -mt-[3px] shad rounded-xl px-2 py-1 w-max text-base z-50"
              @click.stop
            >
              <template v-if="isArchive">
                <button @click="restoreTodo({ id: todo.id })">Restore</button>
                <span> / </span>
                <button @click="deleteTodo({ id: todo.id })">Delete</button>
              </template>
              <template v-else>
                <button @click="openEditModal">Edit</button>
                <span> / </span>
                <button @click="archiveTodo({ id: todo.id })">Archive</button>
                <span> / </span>
                <button @click="deleteTodo({ id: todo.id })">Delete</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse-content">
      <p class="text-primary" v-text="todo.description"></p>
      <div class="flex justify-center mt-4"></div>
    </div>
  </div>
  <!-- 編集モーダル -->
  <dialog ref="editModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Edit Todo</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Title</span>
          </label>
          <input
            v-model="editForm.title"
            type="text"
            class="input input-bordered w-full"
            required
          />
        </div>
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            v-model="editForm.description"
            class="textarea textarea-bordered w-full"
            rows="3"
          ></textarea>
        </div>
        <div class="modal-action">
          <button type="button" class="btn" @click="closeEditModal">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import ChevronDownIcon from "~/components/icons/ChevronDown.vue";
import ChevronRightIcon from "~/components/icons/ChevronRight.vue";
import MoreIcon from "~/components/icons/More.vue";

const props = defineProps<{
  todo: ITodo;
  isArchive: boolean;
}>();

const { doneToggleTodo, updateTodo, deleteTodo, archiveTodo, restoreTodo } =
  useTodosStore();

const isOpen = ref<boolean>(false);

const editModal = ref<HTMLDialogElement>();

// 編集フォームの状態
const editForm = ref({
  title: "",
  description: "",
});

// モーダルを開く
const openEditModal = () => {
  editForm.value.title = props.todo.title;
  editForm.value.description = props.todo.description;
  editModal.value?.showModal();
};

// モーダルを閉じる
const closeEditModal = () => {
  editModal.value?.close();
};

// 編集を実行
const handleSubmit = () => {
  updateTodo({
    id: props.todo.id,
    title: editForm.value.title,
    description: editForm.value.description,
  });
  closeEditModal();
};
</script>
