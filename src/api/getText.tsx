import axios from "axios";

// Внутри
// этой функции мы с помощью axios отправляем GET запрос на сервер и возвращаем
// ответ, в нашем случае в ответ на запрос мы ожидаем получить строку с текстом. В
// качестве аргумента функция getText будет принимать количество запрашиваемых
// предложений. Остальные параметры запроса берем из документации baconipsum

async function getText(sentences: string) {
  const response = await axios.get<string>("https://baconipsum.com/api/", {
    params: {
      type: "all-meat",
      sentences,
      format: "text",
    },
  });

  return response;
}

export default getText;
