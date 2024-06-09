import { test, request, expect } from '@playwright/test';


const base_url = 'https://todo-app-sky.herokuapp.com';
const todoTitle: string = "Изучить API-запросы"
const todo_start = {
    "title": todoTitle
}

test("Создание задачи", async ({request}) => {
    const response = await request.post(base_url, {
        data: todo_start
      });
    
    const body = await response.json();

    let task_id = body.id;

    expect(response.status()).toEqual(200);
    expect(body.title).toEqual(todoTitle);
    expect(body.completed).toBeFalsy;
    expect(task_id).toBeGreaterThan(0);

/*
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
    */ 
    
  });


  test("Просмотр задачи", async ({request}) => {
    const create_response = await request.post(base_url, {
        data: todo_start
      });
    
    let {id: task_id} = await create_response.json();

    const response = await request.get(`${base_url}/${task_id}`);

    let {title: title_in_body} = await response.json();
    let {id: id_in_body} = await response.json();
    let {completion_status: completed_in_body} = await response.json();

    expect(response.status()).toEqual(201);
    expect(title_in_body).toEqual(todoTitle);
    expect(id_in_body).toEqual(task_id);
    expect(completed_in_body).toBeFalsy;

  })
  
  test("Переименование задачи", async ({request}) => {
    const create_response = await request.post(base_url, {
        data: todo_start
      });
    
    let {id: task_id} = await create_response.json();

    const new_title = todoTitle + " в Playwright"
    const response = await request.patch(`${base_url}/${task_id}`, {
        data: {"title": new_title}
    })

    let {title: title_in_body} = await response.json();

    expect(response.status()).toBe(200);
    expect(title_in_body).toEqual(new_title);

  });


  test("Завершение задачи", async ({request}) => {
    const task_title: string = "Новый API-тест - написать"
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
  });

  test("Просмотр списка задач", async ({request}) => {
    const response_all = await request.get(`${base_url}`);

    expect(response_all.status()).toEqual(200);

    let response_body = await response_all.json();
    let number_of_tasks = response_body.length;

    response_body.forEach(task => {
        console.log('Checking task ' + task.id)
        expect(task).toHaveProperty('id');
    });

    expect(number_of_tasks).toBeGreaterThanOrEqual(4);

})
  