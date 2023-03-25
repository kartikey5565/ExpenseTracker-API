let form = document.getElementById('my-form');
let list = document.getElementById('users');


//after refresh take all data from server to UI
window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/acdcf1dfb11644119183687a53dadc1a/expence")
        .then((response) => {
            response.data.forEach((ele) => {
                console.log(ele);
                showNewUserOnscreen(ele);
            })
        })

})




form.addEventListener('submit', addItem);

function addItem(e) {
    e.preventDefault();
    // console.log('add item');
    let amount = document.getElementById('amount').value;
    let discription = document.getElementById('discription').value;
    let categary = document.getElementById('categary').value;
    if (amount == "" || discription == "" || categary == "categary") {
        return alert('field is empty' + "\n" + 'please fill details properly');
    }

    //list update 
    function check(obj) {
        let liTag = list.querySelectorAll('li');
        Array.from(liTag).forEach(function (item) {
            let disItem = item.childNodes[2].textContent;
            if(disItem==obj.discription){
                list.removeChild(item);
            }
        })
    }


    let obj = {
        amount,
        discription,
        categary
    }
    async function modifyList() {
        //chech whether list is already present then delete it
        await axios.get("https://crudcrud.com/api/acdcf1dfb11644119183687a53dadc1a/expence")
            .then((response) => {
                response.data.forEach((ele) => {
                    if (ele.discription == obj.discription) {
                        check(obj);
                        axios.delete("https://crudcrud.com/api/acdcf1dfb11644119183687a53dadc1a/expence/"+`${ele._id}`)
                    }
                })
            })


        //add to crudcrud.com by post
        await axios.post("https://crudcrud.com/api/acdcf1dfb11644119183687a53dadc1a/expence", obj)
            .then((response) => {
                console.log(response.data);
                showNewUserOnscreen(response.data);

            })
            .catch((err) => {
                console.log(err);
            })
        return;
    }
    modifyList();

}

//delete item event
list.addEventListener('click', removeItem);
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        li = e.target.parentElement;
        let key = li.childNodes[2].textContent;
        // console.log(key);
        editAxios(key);
        list.removeChild(li);
    }
}

//edit item event
list.addEventListener('click', editItem);
function editItem(e) {
    if (e.target.classList.contains('edit')) {
        // console.log('edit');
        li = e.target.parentElement;
        let amt = li.childNodes[0].textContent;
        let dis = li.childNodes[2].textContent;
        let ctg = li.childNodes[4].textContent;

        let v1 = document.getElementById('amount');
        let v2 = document.getElementById('discription');
        let v3 = document.getElementById('categary');

        list.removeChild(li);
        editAxios(dis);

        v1.value = amt;
        v2.value = dis;
        v3.value = ctg;
    }
}

//function for to add delete and edit button.
function delEdit(li) {
    let del = document.createElement('button');
    del.appendChild(document.createTextNode('Delete Expence'));
    del.className = 'delete';
    let edit = document.createElement('button');
    edit.className = 'edit';
    edit.appendChild(document.createTextNode('Edit Expence'));
    li.appendChild(del);
    li.appendChild(edit);
}


//for display list on screen
function showNewUserOnscreen(obj) {
    let li = document.createElement('li');
    li.className = 'ulList';

    li.appendChild(document.createTextNode(obj.amount));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(obj.discription));
    li.appendChild(document.createTextNode("-"));
    li.appendChild(document.createTextNode(obj.categary));
    list.appendChild(li);

    //make empty all details for new user 
    let val = document.querySelector('#amount');
    let val2 = document.querySelector('#discription');
    let val3 = document.querySelector('#categary');
    val.value = null;
    val2.value = null;
    val3.value = 'categary';

    //delete and edit button creating.
    delEdit(li);
    list.appendChild(li);
}




// "https://crudcrud.com/api/acdcf1dfb11644119183687a53dadc1a/expence"


function editAxios(key) {
    axios.get("https://crudcrud.com/api/acdcf1dfb11644119183687a53dadc1a/expence")
        .then((ele) => {
            ele.data.forEach((ele) => {
                if (ele.discription == key) {
                    // console.log(ele.discription);
                    axios.delete("https://crudcrud.com/api/acdcf1dfb11644119183687a53dadc1a/expence/" + `${ele._id}`);
                }
            })
        }).catch((err) => {
            console.log(err);
        })
}
