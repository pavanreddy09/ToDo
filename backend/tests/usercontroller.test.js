const { userLogin, userRegister } = require("../controllers/usercontroller");
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/usermodel");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe("user login and register test", () => {
  // user login test
  describe("User Login test", () => {
    let req;
    beforeEach(() => {
      req = {
        body: {
          email: "test@gmail.com",
          password: "Test@123",
        },
      };
      jest.clearAllMocks(); // Clear all mocks before each test
    });

    it("should respond with status 200 for a valid login", async () => {
      // Mocking the User.findOne method to return a valid user
      User.findOne.mockImplementationOnce(async () => ({
        _id: "1",
        email: "test@gmail.com",
        password: await bcrypt.hash("Test@123", 10), // Hashed password
        fullName: "Test User",
        avatar: {},
      }));

      // Mocking bcrypt.compare to return true
      bcrypt.compare.mockImplementationOnce(() => Promise.resolve(true));

      // Mocking jwt.sign to return a token
      const mockToken = "mockToken";
      jwt.sign.mockImplementationOnce(() => mockToken);

      // Calling the userLogin function with mocked req and res
      await userLogin(req, res);

      // Checking if res.status was called with the correct status code
      expect(res.status).toHaveBeenCalledWith(200);

      // Checking if res.json was called with the correct response object
      expect(res.json).toHaveBeenCalledWith({
        message: "login successfully",
        user: {
          _id: "1",
          email: "test@gmail.com",
          fullName: "Test User",
          avatar: {},
        },
        acesstoken: mockToken,
      });
    });

    it("should respond with status 401 for an invalid password", async () => {
      User.findOne.mockImplementationOnce(async () => ({
        _id: "1",
        email: "test@gmail.com",
        password: await bcrypt.hash("Test@123", 10), // Hashed password
        fullName: "Test User",
        avatar: {},
      }));
      // Mocking bcrypt.compare to return false
      bcrypt.compare.mockImplementationOnce(() => Promise.resolve(false));

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({ message: "Invalid password" });
    });

    it("should respond with status 404 for a non-existent user", async () => {
      // Mocking the User.findOne method to return null
      User.findOne.mockImplementationOnce(() => null);

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);

      expect(res.json).toHaveBeenCalledWith({
        message: "Email is not registered",
      });
    });

    it("should respond with status 500 for a server error", async () => {
      // Mocking the User.findOne method to throw an error
      User.findOne.mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      await userLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong! Please try again later.",
        error: expect.any(Error),
      });
    });
  });

  // user register test
  describe("User Register", () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear all mocks before each test
    });

    const req = {
      body: {
        fullName: "Test User",
        email: "test@gmail.com",
        password: "Test@123",
        avatar: {},
      },
    };

    it("should respond with status 201 for a successful registration", async () => {
      // Mocking the User.findOne method to return null (user does not exist)
      User.findOne.mockImplementationOnce(null);

      const hashedPassword = bcrypt.hash.mockImplementationOnce(
        () => "hashedPassword"
      );

      // Mocking jwt.sign to return a token
      const mockToken = "mocktoken";
      jwt.sign.mockImplementationOnce(() => mockToken);

      const userSaved = {
        _id: "1",
        fullName: "Test User",
        email: "test@gmail.com",
        password: hashedPassword,
        avatar: {},
      };
      await User.prototype.save.mockResolvedValueOnce(userSaved);

      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(201);

      // Checking if res.json was called with the correct response object
      // expect(res.json).toHaveBeenCalledWith({
      //   _id: "1",
      //   fullName: "Test User",
      //   email: "test@gmail.com",
      //   avatar: {},
      //   acesstoken: mockToken,
      // });
    });

    it("should respond with status 200 when user already exists", async () => {
      User.findOne.mockImplementationOnce(() => ({
        _id: "1",
        email: "test@gmail.com",
        fullName: "Existing User",
        avatar: {},
      }));

      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(200);

      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists Please Login",
      });
    });

    it("should respond with status 500 for a server error", async () => {
      // Mocking the User.findOne method to throw an error
      User.findOne.mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      // Calling the userRegister function with mocked req and res
      await userRegister(req, res);

      expect(res.status).toHaveBeenCalledWith(500);

      expect(res.json).toHaveBeenCalledWith({
        message: "Something went wrong! Please try again later.",
        error: expect.any(Error),
      });
    });
  });
});
