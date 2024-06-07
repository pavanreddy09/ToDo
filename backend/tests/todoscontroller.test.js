const Todos = require("../models/todosmodel");
const {
  getTodos,
  postTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoscontroller");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

jest.mock("../models/todosmodel");

describe("Todo Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  // get todos api test
  describe("getTodos", () => {
    // success test
    it("should respond with status 200 and todos array if found", async () => {
      const mockUser = { email: "test@example.com" };
      const mockTodos = [
        {
          title: "Test Todo",
          description: "This is a test todo",
          status: "Todo",
        },
      ];

      Todos.find.mockResolvedValueOnce(mockTodos);

      await getTodos({ user: mockUser }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTodos);
    });

    // failure test
    it("should respond with status 400 and error message if no todos found", async () => {
      Todos.find.mockResolvedValueOnce(null);

      await getTodos({ user: { email: "test@example.com" } }, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong! Unable to fetch the todos",
      });
    });
  });

  // post todos api test
  describe("postTodo", () => {
    it("should respond with status 201 and created todo if successful", async () => {
      const mockTodo = {
        title: "New Todo",
        description: "This is a new todo",
        status: "In Progress",
        email: "test@example.com",
      };

      Todos.create.mockResolvedValueOnce(mockTodo);

      await postTodo({ body: mockTodo }, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockTodo);
    });

    it("should respond with status 400 and error message if creation fails", async () => {
      Todos.create.mockResolvedValueOnce(null);

      await postTodo({ body: {} }, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong! Unable to create a todo",
      });
    });
  });

  // get todo test
  describe("getTodo", () => {
    it("should respond with status 200 and todo object if found", async () => {
      const mockTodoId = "mockId123";
      const mockTodo = {
        _id: mockTodoId,
        title: "Test Todo",
        description: "This is a test todo",
        status: "Todo",
      };

      Todos.findById.mockResolvedValueOnce(mockTodo);

      await getTodo({ params: { id: mockTodoId } }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTodo);
    });

    it("should respond with status 400 and error message if todo not found", async () => {
      Todos.findById.mockResolvedValueOnce(null);

      await getTodo({ params: { id: "12345" } }, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong! Unable to fetch a todo with id 12345",
      });
    });
  });

  // update todo test
  describe("updateTodo", () => {
    it("should respond with status 200 and updated todo if successful", async () => {
      const mockTodoId = "mockId123";
      const mockUpdatedTodo = {
        _id: mockTodoId,
        title: "Updated Todo",
        description: "This is an updated todo",
        status: "completed",
      };

      Todos.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedTodo);

      await updateTodo(
        {
          params: { id: mockTodoId },
          body: mockUpdatedTodo,
          user: { email: "test@example.com" },
        },
        res
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedTodo);
    });

    it("should respond with status 400 and error message if update fails", async () => {
      Todos.findByIdAndUpdate.mockResolvedValueOnce(null);

      await updateTodo(
        {
          params: { id: "12345678" },
          body: {},
          user: { email: "test@example.com" },
        },
        res
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "Something went wrong! Unable to update a todo with id 12345678",
      });
    });
  });

  // delete todo test
  describe("deleteTodo", () => {
    it("should respond with status 200 and deletedCount if successful", async () => {
      const mockTodoId = "mockId123";
      const mockDeletedCount = 1;

      Todos.deleteOne.mockResolvedValueOnce({ deletedCount: mockDeletedCount });

      await deleteTodo({ params: { id: mockTodoId } }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ deletedCount: mockDeletedCount });
    });

    it("should respond with status 400 and error message if deletion fails", async () => {
      Todos.deleteOne.mockResolvedValueOnce(null);

      await deleteTodo({ params: { id: "12345678" } }, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message:
          "Something went wrong! Unable to delete a todo with id 12345678",
      });
    });
  });
});
