import {
    addTransactionToArray,
    removeTransactionFromArray,
    calculateTotalFromArray,
    getTransactionById
} from "./transactions.js";

import {
    renderRow,
    removeRow,
    updateTotal,
    showDetails
} from "./ui.js";

import { generateId } from "./utils.js";
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

/**
 * Обработчик кликов по таблице транзакций.
 * 
 * Реализует делегирование событий:
 * - При клике на кнопку удаляет транзакцию
 * - При клике на строку отображает подробное описание
 * 
 * @param {MouseEvent} event - объект события клика
 */
document.querySelector('#transactionTable').addEventListener('click', (event) => {
    const row = event.target.closest('tr');
    if(!row) return;

    const id = Number(row.dataset.id);

    /**
     * Если клик был по кнопке удаления,
     * вызывается функция удаления транзакции
     */
    if(event.target.tagName === 'BUTTON'){
        deleteTransaction(id, row);
        return;
    }

    /**
     * При клике на строку получаем транзакцию
     * и отображаем её полное описание
     */
    const transaction = getTransactionById(id);
    if(transaction){
        showDetails(transaction.description);
    }
});
/**
 * Обработчик отправки формы.
 * 
 * Перехватывает стандартное поведение формы
 * и вызывает функцию добавления транзакции.
 * 
 * @param {SubmitEvent} event - событие отправки формы
 */
document.querySelector('#transactionForm').addEventListener('submit', addTransaction);