const ItemList=document.getElementById("item-list");
const ItemForm=document.getElementById("item-form");
const ItemInput=document.getElementById("item-input");
const clearBtn=document.getElementById("clear");
const ItemFilter=document.getElementById("filter");
const formBtn=ItemForm.querySelector("button");
let EditMode=false;

function displayItemsFromStorage(){
    const displayFromStorage=getItemsFromStorage();

    displayFromStorage.forEach((item)=>{
        addItemTODOM(item);
    }) 
    checkUI();
}


function addItem(e){
    e.preventDefault();

    const newItem=ItemInput.value;

    if(newItem===''){
        alert("Please enter something");
    }

    console.log("Success");

    // console.log(e);

    if(EditMode==true){
        const itemToEdit=ItemList.querySelector('.edit-mode');
        if (checkIfItemExists(newItem)) {
            alert("That item already exists!");
            checkUI();
            itemToEdit.classList.remove('edit-mode');
            ItemInput.value = "";
            return;
          }
        removeFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        EditMode=false;
    }
    else{
        if(checkIfItemExists(newItem)){
            alert("Item Already Exists !!");
            ItemInput.value = "";
            return;
        }
    }


    addItemTODOM(newItem);

    addItemToStorage(newItem);

    checkUI();

    ItemInput.value="";
   
}

function addItemTODOM(newItem){
    const li=document.createElement("li");
    li.appendChild(document.createTextNode(newItem));
        
    li.appendChild(createButton("remove-item btn-link text-red"));

    ItemList.appendChild(li);
}

function addItemToStorage(item){
    const StorageItem=getItemsFromStorage();
       
    StorageItem.push(item);

    localStorage.setItem('items',JSON.stringify(StorageItem));
}


function getItemsFromStorage(){
    let StorageItem;

    if(localStorage.getItem("items")===null){ 
        StorageItem=[];
    }
    else{
        StorageItem=JSON.parse(localStorage.getItem("items"));
    }

    return StorageItem;
}

function createButton(classes){
    const btn=document.createElement("button");
    btn.className=classes;
    btn.appendChild(createIcon("fa-solid fa-xmark"));
    return btn;
}

function createIcon(classes){
    const icon=document.createElement("i");
    icon.className=classes;
    return icon;
}


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        clearItem(e.target.parentElement.parentElement);
    }
    else{
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item){
    const ItemFromStorage=getItemsFromStorage();

    return ItemFromStorage.includes(item);
}

function setItemToEdit(item){

    EditMode=true;

    ItemList.querySelectorAll("li").forEach((i)=>i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML='<i class="fa-solid fa-pen"> Update Item</i>';
    formBtn.style.backgroundColor='#228B22';
    ItemInput.value=item.textContent;

}





function clearItem(item){
        if(confirm("Are you sure")){

            console.log(item);
            item.remove();

            removeFromStorage(item.textContent);
            
            checkUI();
        } 
}

function clearItems(){
    while(ItemList.firstChild){
        ItemList.firstChild.remove();
    }

    localStorage.removeItem('items');

    checkUI();
}

function removeFromStorage(item){
    
    let ItemsFromStorage=getItemsFromStorage();
    
    ItemsFromStorage=ItemsFromStorage.filter((i)=>{
        return i!==item;
    })
    
    localStorage.setItem('items',JSON.stringify(ItemsFromStorage));
    
    }
    


function checkUI(){
    ItemInput.value="";

    const Items=ItemList.querySelectorAll("li");
    if(Items.length===0){
        clearBtn.style.display='none';
        ItemFilter.style.display='none';
    }
    else{
        clearBtn.style.display='block';
        ItemFilter.style.display='block';
    }
    formBtn.innerHTML='<i class="fa-solid fa-plus"> Add Item';
    formBtn.style.backgroundColor='#333';
    EditMode=false;
}

function filterItems(e){
    const Items=ItemList.querySelectorAll("li");
    const text=e.target.value.toLowerCase();
    Items.forEach((item)=>{
        const textItem=item.firstChild.textContent.toLocaleLowerCase();
        if(textItem.indexOf(text)!=-1){
            item.style.display='flex';
        }
        else{
            item.style.display='none';
        }
    })
}


function init(){
    ItemForm.addEventListener('submit',addItem);

    ItemList.addEventListener('click',onClickItem);

    clearBtn.addEventListener("click",clearItems);

    ItemFilter.addEventListener("input",filterItems);

    document.addEventListener('DOMContentLoaded',displayItemsFromStorage);

    checkUI();
}

init();


