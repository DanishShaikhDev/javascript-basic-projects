let input = document.querySelector('#input');
const list = document.querySelector('#list');
const deleteBtn = document.querySelector('.del');
const deleteAllBtn = document.querySelector('#delete-all-items');


const retrieveItemsFromLocalStorage = () => {
    // Retrieve the JSON string from localStorage and parse it back to an array
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
        return JSON.parse(storedItems);
    } else {
        return [];
    }
};


const storeItemsInLocalStorage = (items) => {
    // Convert the array of items to a JSON string and store it in localStorage
    localStorage.setItem('items', JSON.stringify(items));
}



let div;
let icon;
let items;

const createItem = (str) => {

    // creating div,adding class, id, innerText and then appending into the list div
    div = document.createElement('div')
    div.className = 'item';
    div.id = convertToValidID(str).toLowerCase();
    div.innerText = str;
    list.appendChild(div);

    // creating icon and adding class Name and appending into the div.item
    icon = document.createElement('i');
    icon.className = 'fa fa-trash';
    div.appendChild(icon);

    // check the div
    console.log(div);

}


window.addEventListener('load', () => {
    items = retrieveItemsFromLocalStorage();
    console.log(items);
    for(let item in items) {
        createItem(items[item]);
    }
});


const addItemToList = (item) => {
    items.push(item);

    // check the list
    console.log(items);

    // store the items list in local storage
    storeItemsInLocalStorage(items);
};


const updateItemList = (specificItem) => {
    let itemIndex = items.findIndex(item => item === specificItem);
        if(itemIndex !== -1) {
            items.splice(itemIndex, 1);
        }
    
    // update the items list in the local storage
    storeItemsInLocalStorage(items);
};


const deleteAllItemsFromList = () => {

    // delete the items list from the local storage
    localStorage.removeItem('items');
};





const convertToValidID = (str) => {
    str = str.split(' ').join('-');
    return str;
};




// add button with button
document.querySelector('#add-btn')
.addEventListener('click', () => {
    if(input.value !== '') {
        createItem(input.value);
        addItemToList(input.value);

        input.value = '';
    }
});


// add button with enter
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && input.value !== '') {
        createItem(input.value);
        addItemToList(input.value);

        input.value = '';
    }
});



// delete a specific item
list.addEventListener('click', (e) => {
    if(e.target.className === 'fa fa-trash' && e.target.parentNode.parentNode) {
        list.removeChild(e.target.parentNode);
        updateItemList(e.target.parentNode.innerText);
    }
});


// delete all items in the list
deleteAllBtn.addEventListener('click', () => {
    while(list.firstElementChild) {
        list.removeChild(list.firstElementChild);
        deleteAllItemsFromList();
    }
});