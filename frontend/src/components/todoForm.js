import React from "react";

function TodoForm({
  formValues,
  setFormValues,
  handleOnSubmit,
  isLoading,
  buttonText,
}) {
  return (
    <div className="formbg">
      <form onSubmit={handleOnSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title<i>*</i>
          </label>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label htmlFor="descrition">Description</label>
          <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="status">
            Status<i>*</i>
          </label>
          <select
            name="status"
            value={formValues.status}
            onChange={(e) =>
              setFormValues({ ...formValues, status: e.target.value })
            }
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="field">
          <button disabled={isLoading}>{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
