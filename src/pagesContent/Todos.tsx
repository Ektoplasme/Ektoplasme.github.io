import "./Todos.css";

export const ToDos = () => {
  return (
    <>
      <h2>Tasks:</h2>
      <div className="todos-container">
        <section>
          <input type="checkbox" checked={false} />
          <label>Improve overall style</label>
        </section>
        <section>
          <input type="checkbox" checked={false} />
          <label>Correct texts</label>
        </section>
        <section>
          <input type="checkbox" checked={false} />
          <label>Fix mobile version 📱</label>
        </section>
        <section>
          <input type="checkbox" checked={false} />
          <label>Hide the commits viewer on smaller screens</label>
        </section>
        <section>
          <input type="checkbox" checked={false} />
          <label>Improve performances with particles ?</label>
        </section>
        <section>
          <input type="checkbox" checked={false} />
          <label>Add french language support</label>
        </section>
        <section>
          <input type="checkbox" checked={false} />
          <label>???</label>
        </section>
        <section>
          <input type="checkbox" checked />
          <label>Add Todos section</label>
        </section>
        <section>
          <input type="checkbox" checked />
          <label>Add "navigation" buttons</label>
        </section>
        <section>
          <input type="checkbox" checked />
          <label>Split and clean App.tsx</label>
        </section>
      </div>
    </>
  );
};
