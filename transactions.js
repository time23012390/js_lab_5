/**
 * массив  транзакций
 */
export let transactions = [];
/**
 * Добавляет транзакцию в массив
 * @param {Object} transaction - объект транзакции
 */
export function addTransactionToArray(transaction){
    transactions.push(transaction);
}
/**
 * 
 * @param {Number} id - id удаляемой транзакции
 */
export function removeTransactionFromArray(id){
    transactions = transactions.filter(t => t.id !== id);
}
/**
 * 
 * @returns {Number} - сумму транзакций
 */
export function calculateTotalFromArray(){
    return transactions.reduce((sum, item) => sum + item.amount, 0);
}
/**
 * 
 * @param {Number} id 
 * @returns {Object}
 */
export function getTransactionById(id){
    return transactions.find(t => t.id === id);
}