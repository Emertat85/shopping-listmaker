import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-e534e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const dataBase = getDatabase (app)
const shoppingListEl = ref(dataBase,"kharid")

const inputFieldEl=document.getElementById("input-el")
const buttonEl = document.getElementById ("button-el")
const ulLi = document.getElementById ("ul-li")

buttonEl.addEventListener("click",function(){
    let inptValue = inputFieldEl.value
    push(shoppingListEl,inptValue)
    clearInputFieldEl()
    
})
onValue (shoppingListEl,function(snappshot){
    if (snappshot.exists()){
        let itemArray = Object.entries(snappshot.val())
        clearShoppingListEl()
        for (let i = 0 ; i < itemArray.length ; i++){
            let currentItem = itemArray [i]
            appendToTheList(currentItem)
        }
    }else{
        ulLi.innerHTML = "موردی یافت نشد"
    }
})
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function clearShoppingListEl() {
    ulLi.innerHTML = ""
}
function appendToTheList (item){
    let currentItemId =item [0]
    let currentItemValue =item [1]
    let newEl = document.createElement ("li")
    newEl.textContent = currentItemValue

    newEl.addEventListener ("click",function(){
        let exactLocationInDb = ref (dataBase,`kharid/${currentItemId}`)
        remove(exactLocationInDb)
    })
    ulLi.append(newEl)
}