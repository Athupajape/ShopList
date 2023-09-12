const ItemList=document.getElementById("item-list");
const ItemForm=document.getElementById("item-form");
const ItemInput=document.getElementById("item-input");

function addItem(e){
    e.preventDefault();

    const newItem=ItemInput.value

    if(newItem===''){
        alert("Please enter something");
    }

    console.log("Success");

    // console.log(e);

    const li=document.createElement("li");
    li.appendChild(document.createTextNode(newItem));
        
    li.appendChild(createButton("remove-item btn-link text-red"));

    ItemList.appendChild(li);

    ItemInput.value=" ";
   
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

ItemForm.addEventListener('submit',addItem);

