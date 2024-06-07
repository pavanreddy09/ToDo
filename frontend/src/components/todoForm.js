import React from "react";

function TodoForm({
  formValues,
  setFormValues,
  handleOnSubmit,
  isLoading,
  buttonText,
}) {
  return (
    <div className="formbg" role="main">
      <form role={`${buttonText}-form`} onSubmit={handleOnSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title<i>*</i>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            aria-label="title"
            value={formValues.title}
            onChange={(e) =>
              setFormValues({ ...formValues, title: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label htmlFor="descrition">Description</label>
          {/* <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          /> */}
          <textarea
            name="description"
            value={formValues.description}
            id="description"
            aria-label="description"
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor="status">
            Status<i>*</i>
          </label>
          <select
            name="status"
            value={formValues.status}
            id="status"
            aria-label="status"
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
          <button disabled={isLoading} aria-label={`${buttonText}-button`}>
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
