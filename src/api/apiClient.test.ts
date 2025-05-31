import { setupServer } from "msw/node";
import { http } from "msw";
import { apiClient } from "../../src/api/apiClient";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("apiClient", () => {
  const mockData = [
    {
      id: "4670",
      name: "Максим",
      surname: "Шубный",
      email: "katanablaade@yandex.ru",
      age: "25",
      city: "Оренбург",
      country: "Россия",
    },
  ];

  test("fetchRecords должен вернуть данные", async () => {
    server.use(
      http.get("http://localhost:3001/records", () => {
        return new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      })
    );

    const response = await apiClient.get("/records");
    expect(response.data).toEqual(mockData);
  });

  test("fetchRecords должен обработать ошибку сервера", async () => {
    server.use(
      http.get("http://localhost:3001/records", () => {
        return new Response(null, { status: 500 });
      })
    );

    try {
      await apiClient.get("/records");
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.response?.status).toBe(500);
    }
  });

  test("createRecord должен отправить POST-запрос с правильным телом", async () => {
    const newRecord = {
      name: "Алексей",
      surname: "Новый",
      email: "new@example.com",
      age: "30",
      city: "Москва",
      country: "Россия",
    };

    server.use(
      http.post("http://localhost:3001/records", async ({ request }) => {
        const body = await request.json();
        expect(body).toEqual(newRecord);

        return new Response(JSON.stringify({ ...newRecord, id: "9999" }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      })
    );

    const response = await apiClient.post("/records", newRecord);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("id");
  });
});
