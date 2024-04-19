import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://we-are-the-champions-d9262-default-rtdb.europe-west1.firebasedatabase.app/"             
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const listInDB = ref(database, "list")

const inputEl = document.getElementById("input-field")
const buttonEl = document.getElementById("publish-button")
const listEl = document.getElementById("list")

buttonEl.addEventListener("click",function() {
    let inputValue = inputEl.value
    if (inputValue) {
        push(listInDB,inputValue)
    
        clearInputEl()
    }
    
    
})

onValue(listInDB,function(snapshot){
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearlistEl()
    
        for (let i=0 ; i < itemsArray.length ; i++){
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToListEl(currentItem)
        } 
    }else {
        listEl.innerHTML = ""
    }
    
    
})

function clearlistEl() {
    listEl.innerHTML = ""
}

function clearInputEl() {
    inputEl.value = ""
}

function appendItemToListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `list/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    listEl.append(newEl)
}