import { v4 as uuid4 } from "uuid";

const defaultTodos: ITodo[] = [
  {
    id: uuid4(),
    title: "買い物リスト作成",
    description:
      "週末の買い物に向けて、必要な食材や日用品をリストアップする。冷蔵庫の中身も確認して無駄買いを防ぐ。",
    level: "low",
    pin: false,
    done: false,
    archive: false,
  },
  {
    id: uuid4(),
    title: "散歩とジョギング 🏃‍♂️",
    description:
      "健康維持のため、毎日30分程度の軽い運動を心がける。近所の公園を散歩したり、体調に合わせてジョギングも取り入れる。",
    level: "low",
    pin: false,
    done: false,
    archive: false,
  },
  {
    id: uuid4(),
    title: "プロジェクト資料準備",
    description:
      "来週のプレゼンテーション用の資料を作成する。データの整理と分析結果をまとめ、わかりやすいスライドに仕上げる。",
    level: "medium",
    pin: false,
    done: false,
    archive: false,
  },
  {
    id: uuid4(),
    title: "新機能の実装 💻",
    description:
      "アプリケーションに新しい機能を追加する。設計からテストまで一通り行い、品質の高いコードを心がける。",
    level: "high",
    pin: false,
    done: false,
    archive: false,
  },
  {
    id: uuid4(),
    title: "重要会議の準備 📋",
    description:
      "明日の重要な会議に向けて議題を整理し、必要な資料を準備する。参加者への事前連絡も忘れずに行う。",
    level: "high",
    pin: false,
    done: false,
    archive: false,
  },
  {
    id: uuid4(),
    title: "システムメンテナンス",
    description:
      "サーバーの定期メンテナンスを実施する。セキュリティアップデートの適用と、パフォーマンスの最適化を行う。",
    level: "high",
    pin: false,
    done: false,
    archive: false,
  },
  {
    id: uuid4(),
    title: "読書タイム 📚",
    description:
      "技術書を読んで新しい知識を身につける。今月は React と TypeScript について深く学習する予定。",
    level: "low",
    pin: false,
    done: true,
    archive: true,
  },
  {
    id: uuid4(),
    title: "家の掃除と整理整頓",
    description:
      "部屋の大掃除を行い、不要なものを整理する。収納の見直しも行って、より快適な生活空間を作る。",
    level: "high",
    pin: false,
    done: false,
    archive: true,
  },
];

export const useTodosStore = defineStore("todos", () => {
  const todos = ref<ITodo[]>([]);

  const cachedTodos = localStorage.getItem("todos");
  todos.value = cachedTodos ? JSON.parse(cachedTodos) : [...defaultTodos];
  saveTodos();

  function findTodoById(id: string): ITodo {
    const todo = todos.value.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`);
    }
    return todo;
  }

  function createTodo({ title, description, level }: ICreateTodo): ITodo {
    const todo = {
      id: uuid4(),
      title,
      description,
      level,
      pin: false,
      done: false,
      archive: false,
    };
    todos.value.push(todo);
    saveTodos();
    return todo;
  }
  function doneToggleTodo({ id, done }: IDoneToggleTodo): ITodo {
    const todo = findTodoById(id);
    todo.done = done;
    saveTodos();
    return todo;
  }
  function updateTodo({ id, title, description }: IUpdateTodo): ITodo {
    const todo = findTodoById(id);
    todo.title = title;
    todo.description = description;
    saveTodos();
    return todo;
  }
  function deleteTodo({ id }: IDeleteTodo): boolean {
    const todo = findTodoById(id);
    todos.value.splice(todos.value.indexOf(todo), 1);
    saveTodos();
    return true;
  }
  function archiveTodo({ id }: IArchiveTodo): ITodo {
    const todo = findTodoById(id);
    todo.archive = true;
    saveTodos();
    return todo;
  }
  function restoreTodo({ id }: IRestoreTodo): ITodo {
    const todo = findTodoById(id);
    todo.archive = false;
    saveTodos();
    return todo;
  }
  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  }

  const lowTodos = computed<ITodo[]>(() =>
    todos.value.filter((v) => v.level === "low" && !v.archive)
  );
  const mediumTodos = computed<ITodo[]>(() =>
    todos.value.filter((v) => v.level === "medium" && !v.archive)
  );
  const highTodos = computed<ITodo[]>(() =>
    todos.value.filter((v) => v.level === "high" && !v.archive)
  );
  const archivedTodos = computed<ITodo[]>(() =>
    todos.value.filter((v) => v.archive)
  );

  return {
    todos,
    lowTodos,
    mediumTodos,
    highTodos,
    archivedTodos,
    createTodo,
    doneToggleTodo,
    updateTodo,
    deleteTodo,
    archiveTodo,
    restoreTodo,
    saveTodos,
  };
});
