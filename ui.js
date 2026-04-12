/**
 * Отрисовывает строку таблицы для одной транзакции.
 * 
 * Создаёт новый элемент <tr>, заполняет его данными транзакции
 * и добавляет в <tbody> таблицы. Также устанавливает цвет строки
 * в зависимости от суммы (положительная — зелёный, отрицательная — красный).
 * 
 * @param {Object} transaction - объект транзакции
 * @param {number} transaction.id - уникальный идентификатор
 * @param {Date} transaction.date - дата и время транзакции
 * @param {number} transaction.amount - сумма транзакции
 * @param {string} transaction.category - категория транзакции
 * @param {string} transaction.description - описание транзакции
 */
export function renderRow(transaction){
    const tbody = document.querySelector('#transactionTable tbody');
    const row = document.createElement('tr');

    row.dataset.id = transaction.id;

    row.style.backgroundColor = transaction.amount > 0 ? '#38c500' : '#b20000';

    const shortDesc = transaction.description.split(' ').slice(0, 4).join(' ');

    row.innerHTML = `   
        <td>${transaction.date.toLocaleString()}</td>
        <td>${transaction.category}</td>
        <td>${shortDesc}</td>
        <td><button>Delete</button></td>
    `;

    tbody.appendChild(row);
}
/**
 * Удаляет строку таблицы из DOM.
 * 
 * @param {HTMLTableRowElement} row - строка таблицы (<tr>), которую нужно удалить
 */
export function removeRow(row){
    row.remove();
}
/**
 * Обновляет отображение общей суммы транзакций на странице.
 * 
 * @param {number} sum - итоговая сумма всех транзакций
 */
export function updateTotal(sum){
    document.querySelector('#sum').textContent = sum;
}
/**
 * Отображает полное описание выбранной транзакции.
 * 
 * @param {string} description - текст полного описания транзакции
 */
export function showDetails(description){
    document.querySelector('#details').textContent = description;
}