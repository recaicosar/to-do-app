import FilterBar from "@/components/FilterBar";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { Header } from "@/components/ui/Header";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.app}>
      <Header />
      <main className="main">
        <AddTodo />

        <section className="todos">
        <h2>Job List</h2>

          <FilterBar />

          <TodoList />
        </section>
      </main>
    </div>
  );
}
