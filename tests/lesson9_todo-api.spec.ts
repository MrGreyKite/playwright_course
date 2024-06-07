import { test, expect } from '@playwright/test';

const base_url = 'https://todo-app-sky.herokuapp.com';

test("Создание задачи", async ({request}) => {
    const todoTitle: string = "Изучить ApiRequestContext"
    const todo = {
        "title": todoTitle
    }

    const response = await request.post(base_url, {
        data: todo
      });
    
    const body = await response.json();

    let {id: task_id} = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(body['title']).toEqual(todoTitle);

    //post-condition - очищение тестовых данных
    try {
        const delete_response = await request.delete(`${base_url}/${task_id}`);
        if (!delete_response.ok()) {
            throw new Error(`Ошибка при удалении задачи: ${delete_response.statusText()}`);
        }
        console.log("Тестовые данные успешно удалены, статус: " + delete_response.status());
    } catch (error) {
        console.error("Произошла ошибка при удалении тестовых данных:", error);

        // Повторный GET-запрос для проверки, что задача действительно удалена
        try {
            const double_check_response = await request.get(`${base_url}/${task_id}`);
            if (double_check_response.ok()) {
                const existing_task = await double_check_response.json();
                console.log("Задача все еще существует:", existing_task);
            } else {
                console.log("Задача успешно удалена, но вызов DELETE был прерван.");
            }
        } catch (doubleCheckError) {
            console.error("Ошибка при проверке существования задачи после неудачного удаления:", doubleCheckError);
        }
    }
    
  });
  
  
  test("Переименование задачи", async ({request}) => {
    const task_title: string = "Изучение API-запросов"
    const todo = {
        "title": task_title
    }

    const create_response = await request.post(base_url, {
        data: todo
      });
    
    let {id: task_id} = await create_response.json();

    const new_title = task_title + " в Playwright"
    const response = await request.patch(`${base_url}/${task_id}`, {
        data: {"title": new_title}
    })

    let {title: title_in_body} = await response.json();
    expect(response.status()).toBe(200);
    expect(title_in_body).toEqual(new_title);

    //post-condition - очищение тестовых данных
    try {
        const delete_response = await request.delete(`${base_url}/${task_id}`);
        if (!delete_response.ok()) {
            throw new Error(`Ошибка при удалении задачи: ${delete_response.statusText()}`);
        }
        console.log("Тестовые данные успешно удалены, статус: " + delete_response.status());
    } catch (error) {
        console.error("Произошла ошибка при удалении тестовых данных:", error);

        // Повторный GET-запрос для проверки, что задача действительно удалена
        try {
            const double_check_response = await request.get(`${base_url}/${task_id}`);
            if (double_check_response.ok()) {
                const existing_task = await double_check_response.json();
                console.log("Задача все еще существует:", existing_task);
            } else {
                console.log("Задача успешно удалена, но вызов DELETE был прерван.");
            }
        } catch (doubleCheckError) {
            console.error("Ошибка при проверке существования задачи после неудачного удаления:", doubleCheckError);
        }
    }
  });


  test("Завершение задачи", async ({request}) => {
    const task_title: string = "API-тест - написать"
    const todo = {
        "title": task_title
    }

    const create_response = await request.post(base_url, {
        data: todo
      });
    
    let {id: task_id} = await create_response.json();

    const response_for_completion = await request.patch(`${base_url}/${task_id}`, {
        data: {"completed": true}
    })

    let {completed: completion_status} = await response_for_completion.json();

    expect(response_for_completion.status()).toBe(200);
    expect(completion_status).toBeTruthy();

    //post-condition - очищение тестовых данных
    try {
        const delete_response = await request.delete(`${base_url}/${task_id}`);
        if (!delete_response.ok()) {
            throw new Error(`Ошибка при удалении задачи: ${delete_response.statusText()}`);
        }
        console.log("Тестовые данные успешно удалены, статус: " + delete_response.status());
    } catch (error) {
        console.error("Произошла ошибка при удалении тестовых данных:", error);

        // Повторный GET-запрос для проверки, что задача действительно удалена
        try {
            const double_check_response = await request.get(`${base_url}/${task_id}`);
            if (double_check_response.ok()) {
                const existing_task = await double_check_response.json();
                console.log("Задача все еще существует:", existing_task);
            } else {
                console.log("Задача успешно удалена, но вызов DELETE был прерван.");
            }
        } catch (doubleCheckError) {
            console.error("Ошибка при проверке существования задачи после неудачного удаления:", doubleCheckError);
        }
    }
  });