<div align="center">
<h2>Министерство образования и исследований</h2>
<h2>Молдавский Государственный Университет</h2>
<h3>Факультет Математики и Информатики</h3>
<h3>Департамент Информатики</h3>

<br>

<p><strong>Отчёт</strong></p>
<p>по дисциплине «JavaScript»</p>
<p><strong>Лабораторная работа №5</strong></p>
<p>Работа с DOM-деревом и событиями в JavaScript</p>

<br><br>

<p><strong>Выполнила:</strong><br>
Чебанова София, гр. IA2503</p>

<p><strong>Проверил:</strong><br>
Nicolai Calin, asistent universitar</p>

<br><br>

<p>Кишинёв, 2026</p>

</div>

---

# Цель работы

Изучить работу с DOM (Document Object Model), обработку событий в JavaScript, использование модульной структуры (import/export), создание динамического интерфейса (таблица, форма), а также основы архитектуры клиентского приложения.

## Шаг 1. Настройка и структурирование проекта

Была создана корневая папка проекта, внутри которой размещены основные файлы.

Структура проекта:

```
js_lab_5/
│
├── index.html
├── style.css
└── src/
    ├── index.js
    ├── transactions.js
    ├── ui.js
    └── utils.js
```
* index.html — основной HTML-файл
* style.css — файл стилей
* index.js — главный модуль приложения
* transactions.js — работа с данными
* ui.js — работа с DOM
* utils.js — вспомогательные функции

Файл index.js подключён в HTML с использованием:
```html
<script type="module" src="./src/index.js"></script>
```

## Шаг 2. Представление транзакции

Создан массив transactions, в котором хранятся объекты транзакций.

Структура объекта транзакции:

```js
const newTransaction = {
        id: generateId(),
        date: new Date(),
        amount: Number(formData.get('amount')),
        category: formData.get('category'),
        description: formData.get('description')
    };
```

<img width="471" height="181" alt="image" src="https://github.com/user-attachments/assets/4c9dc81e-a6bf-4f5b-85bc-8e3ff34f247e" />

Каждая транзакция представляет собой отдельный объект.

Шаг 3. Отображение транзакций

В HTML создана таблица для отображения транзакций:

Столбцы таблицы:

* Дата и Время
* Категория транзакции
* Краткое описание транзакции
* Действие (кнопка удаления)

Таблица изначально пустая и заполняется динамически с помощью JavaScript.

```html
row.innerHTML = `   
        <td>${transaction.date.toLocaleString()}</td>
        <td>${transaction.category}</td>
        <td>${shortDesc}</td>
        <td><button>Delete</button></td>
    `;
```

<img width="503" height="342" alt="image" src="https://github.com/user-attachments/assets/869ec85a-0cd1-48a2-adaa-ca8af60c97f0" />

## Шаг 4. Добавление транзакций

Реализована функция addTransaction().

```js
/**
 * Создает объект транзакции
 * Вызывает функции добавления транзакции в массив, создания ряда(строки), подсчета общей суммы транзакций
 * Очищает форму
 * @param {Event} event 
 */
function addTransaction(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newTransaction = {
        id: generateId(),
        date: new Date(),
        amount: Number(formData.get('amount')),
        category: formData.get('category'),
        description: formData.get('description')
    };

    addTransactionToArray(newTransaction);
    renderRow(newTransaction);
    updateTotal(calculateTotalFromArray());

    event.target.reset();
}
```

<img width="726" height="599" alt="image" src="https://github.com/user-attachments/assets/7309a16f-4810-4f0a-bd51-6af681b562b2" />

Функционал:

* получение данных из формы
* создание объекта транзакции
* добавление объекта в массив transactions
* отображение транзакции в таблице

Дополнительно:

* строки окрашиваются:
  * зелёный цвет — положительная сумма
  * красный цвет — отрицательная сумма
* описание сокращается до первых 4 слов

## Шаг 5. Управление транзакциями

В каждую строку добавлена кнопка удаления.

Реализовано:

* удаление строки из таблицы
* удаление объекта из массива

```js
/**
 * Вызывает функцию удаления элемента из массива
 * Удаляет ряд из таблицы
 * @param {Number} id 
 * @param {Object} row 
 */
function deleteTransaction(id, row){
    removeTransactionFromArray(id);
    removeRow(row);
    updateTotal(calculateTotalFromArray());
    showDetails("");
}
```

<img width="485" height="270" alt="image" src="https://github.com/user-attachments/assets/1958e422-73e9-49fa-abd9-007e234d8509" />

Используется делегирование событий обработчик кликов назначен на элемент <table>.

## Шаг 6. Подсчёт суммы транзакций

Создана функция calculateTotal().

```js
export function calculateTotalFromArray(){
    return transactions.reduce((sum, item) => sum + item.amount, 0);
}
```

Функционал:

* суммирует все значения amount из массива
* обновляет отображение общей суммы на странице

<img width="709" height="185" alt="image" src="https://github.com/user-attachments/assets/20c6ad4d-ab5b-4f3d-8e10-51608bcb81f3" />

Сумма пересчитывается:

* после добавления транзакции
* после удаления транзакции

## Шаг 7. Отображение полной информации

Добавлен блок:

```html
<div id="details"></div>
```

Функционал: при клике на строку таблицы отображается полное описание транзакции.

## Шаг 8. Добавление транзакции (форма)

<img width="1055" height="357" alt="image" src="https://github.com/user-attachments/assets/264e5bb0-78a0-4846-a98e-350b84a7ba96" />

Создана форма с полями:

* сумма (input type="number")
* категория (select)
* описание (textarea)

Реализована валидация:

* обязательные поля (required)
* проверка корректности данных

### Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?

Доступ к элементу на веб-странице с помощью JavaScript осуществляется через специальные методы поиска в DOM, чаще всего с использованием document.querySelector() или document.getElementById(). Эти методы позволяют выбрать элемент по CSS-селектору или по уникальному идентификатору, после чего с ним можно взаимодействовать: изменять текст, стиль, добавлять обработчики событий. Например, document.querySelector('#id') вернёт первый элемент с указанным id, а document.querySelectorAll() — список элементов.

### Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?

Делегирование событий — это приём, при котором обработчик события назначается не на каждый отдельный элемент, а на их общего родителя, например, на <table> или <ul>. Благодаря механизму всплытия событий (event bubbling), событие от дочернего элемента поднимается вверх, и родитель может его обработать. Это позволяет эффективно управлять событиями, особенно для динамически добавляемых элементов, уменьшает количество обработчиков и упрощает код.

### Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?

Изменить содержимое элемента DOM после его выборки можно с помощью свойств textContent или innerHTML. Свойство textContent позволяет безопасно заменить текст внутри элемента, тогда как innerHTML даёт возможность вставлять HTML-разметку. Например, element.textContent = "Новый текст" заменит содержимое, а element.innerHTML = "<b>Жирный текст</b>" вставит HTML.

### Как можно добавить новый элемент в DOM дерево с помощью JavaScript?

Добавить новый элемент в DOM-дерево можно с помощью методов создания и вставки элементов, таких как document.createElement() и appendChild(). Сначала создаётся новый элемент, затем ему задаются свойства (например, текст), после чего он добавляется в нужное место в DOM. Например, создаём const div = document.createElement('div'), затем div.textContent = "Пример", и вставляем в документ с помощью parent.appendChild(div).

# Вывод

В ходе выполнения лабораторной работы было разработано веб-приложение для управления транзакциями с использованием JavaScript, в котором реализованы добавление, отображение и удаление данных, а также подсчёт общей суммы и вывод подробной информации. В процессе работы были освоены ключевые навыки взаимодействия с DOM, обработки событий, использования модульной структуры кода и принципов разделения ответственности, что позволило создать структурированное и функциональное приложение с удобным пользовательским интерфейсом.
