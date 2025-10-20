const incomes = [];
const expenses = [];

let current = null;

while(true){
    let option = prompt("Enter option:\n1. Income\n2. Expense\n3. Total");

    if(option == null)
        break;
    
    option = option.toLowerCase().trim();

    if(option === 'income' || option === '1'){
        current = incomes;
    }
    else if(option == 'expense' || option === '2'){
        current = expenses;
    }
    else if(option == 'total' || option === '3'){
        showTransactions(incomes, 'Incomes:')
        showTransactions(expenses, 'Expenses:')

        break;
    }
    else{
        alert('Error. Invalid option')
        continue;
    }

    let transaction = getTransaction();
    let errors = validate(transaction.title, transaction.amount);


    if(errors.length > 0){
        alert(errors);
        continue;
    }

    transaction.amount = Number(transaction.amount)

    let index = find(current, transaction.title);

    if(index >= 0)
        current[index].amount += transaction.amount;

    else
        current.push(transaction)
}

function showTransactions(array, category){
        console.log(category);
        array.forEach((item) => console.log(`Title: ${item.title}; Amount: ${item.amount}`))
}

function find(array, title){
    for(let i = 0; i < array.length; i++){
        if(array[i].title === title){
            return i;
        }
    }


    return -1;
}

function getTransaction(){
    let title = prompt("Enter title:");
    let amount = prompt("Enter amount:");

    return { title, amount };
}

function validate(title, amount){
    let errors = [];

    if(!title || typeof(title) !== 'string' || title.length < 1)
        errors.push('Empty title');


    if(!amount || isNaN(amount))
        errors.push('Invalid amount');
    else{
        amount = Number(amount);

        if(amount <= 0)
            errors.push('Amount must be larger than zero')
    }

    return errors
}
