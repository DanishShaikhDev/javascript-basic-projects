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

    // creating icon and adding class Name and appending into the item div
    icon = document.createElement('i');
    icon.className = 'fa fa-trash';
    div.appendChild(icon);

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
    console.log(items);

    // after that store the items list in local storage
    storeItemsInLocalStorage(items);
};


const updateItemList = (specificItem) => {
    let itemIndex = items.findIndex(item => item === specificItem);
        if(itemIndex !== -1) {
            items.splice(itemIndex, 1);
        }
    storeItemsInLocalStorage(items);
};


const deleteAllItemsFromList = () => {
    // after that store the empty items list in local storage
    localStorage.removeItem('items');
};




// let inputString;

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
        console.log('retrieved Item:',retrieveItemsFromLocalStorage());

        input.value = '';
    }
});


// add button with enter
input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && input.value !== '') {
        createItem(input.value);
        addItemToList(input.value);
        console.log('retrieved Item:',retrieveItemsFromLocalStorage());

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