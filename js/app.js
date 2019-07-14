// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDU01SWkJGnAM1Hv27ekul9E0MagZT-sA0",
	authDomain: "planit-041100.firebaseapp.com",
	databaseURL: "https://planit-041100.firebaseio.com",
	projectId: "planit-041100",
	storageBucket: "planit-041100.appspot.com",
	messagingSenderId: "978009145818",
	appId: "1:978009145818:web:8364d555100b53f9"
	};
		// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();

var firestore = firebase.firestore();

const loadUsername = document.querySelector("#loadUsernameButton");
const usernameInput = document.querySelector("#usernameInput");
const itemInput = document.querySelector("#dataInput");
const saveItem = document.querySelector("#saveInputButton");
const itemList = document.querySelector("#dataList");
const newItem = document.querySelector("#addItem");

//FUNCTIONS

function initializeData(){
	docRef.collection("todoList").orderBy("dateSaved").get()
	.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
			console.log(doc.data());
			var li = document.createElement("LI");
			li.appendChild( createItemDiv( ( document.createTextNode( doc.get("eventName") ) ) ) );
			itemList.appendChild(li);
		});
		console.log("Items Loaded");
	}).catch(function (error) {
		console.log("Error loading items: " + error);
	});
}

function createItemDiv(name){
	var itemDiv = document.createElement("DIV");
	itemDiv.className = "item";
	
	var editItemDiv = document.createElement("DIV");
	var editName = document.createElement("INPUT");
	var confirmEdit = document.createElement("BUTTON");
	confirmEdit.innerHTML = "Save";
	var deleteItem = document.createElement("BUTTON");
	deleteItem.innerHTML = "Remove";
	
	///////////Save button and delete button need event listeners
	
	editItemDiv.className = "edit-item";
	editItemDiv.appendChild(editName);
	editItemDiv.appendChild(confirmEdit);
	editItemDiv.appendChild(deleteItem);
	
	itemDiv.appendChild(name);
	itemDiv.appendChild(editItemDiv);
	
	itemDiv.addEventListener("click" , function() {
		editItemDiv.style.display = "block";
		
		itemDiv.addEventListener("mouseleave", function() {
			editItemDiv.style.display = "none";
		});
	});
/*	itemDiv.addEventListener("mouseleave", function() {
		editItemDiv.style.display = "none";
	});
*/	
	return itemDiv;
}

//EVENT LISTENERS

loadUsername.addEventListener("click",function(){
	username = "joshy"; // ******** only for testing purposes ///// usernameInput.value.toLowerCase();
	docRef = firestore.doc("users/" + username);
	console.log("Username: " + username);
	console.log("username loaded!");
	initializeData();
	//hide username input fields
	usernameInput.style.display = "none";
	loadUsername.style.display = "none";
	newItem.style.display = "block";
})

saveItem.addEventListener("click", function() {
	const name = itemInput.value;
	itemInput.value = '';
	docRef.collection("todoList").add({
		eventName : name,
		dateSaved : new Date()
	}).then(function() {
		console.log("Status saved!");
		var li = document.createElement("LI");
		li.appendChild( createItemDiv(document.createTextNode(name)) );
		itemList.appendChild(li);
	}).catch(function (error) {
		console.log("error " + error);
	});
	//hide new item input fields
	document.querySelector("#newItemMenu").style.display = "none";
	
})

newItem.addEventListener("click",function() {
	document.querySelector("#newItemMenu").style.display = "block" ;
})