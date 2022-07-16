/* show(id)-> Remove "hidden" class to the element by id */
const show = (id) => {
    let x = document.getElementById(id);
    if (x.classList.contains("hidden"))
        x.classList.remove("hidden");
}
/* hidde(id)-> Add "hidden" class to the element by id */
const hidde = (id) => {
    document.getElementById(id).classList.add("hidden");
}
/* toggle(id)-> Toggle "hidden" class to the element by id */
const toggle = (id) => {
    document.getElementById(id).classList.toggle("hidden");
}

/* hiddeAfter(element,time )-> Add "hidden" class to the element by id 
 *  after t (ms)
 */
const hiddeAfter = (id, t) => {
    let e = document.getElementById(id);
    setTimeout( () => {
        e.classList.add("hidden");
    }, t, e);
}

/* addClass(id,c)-> Add class "c" to the element by id */
const addClass = (id, c) => {
    let x = document.getElementById(id);
    if (!x.classList.contains(c))
        x.classList.add(c);
}
/* removeClass(id,c)-> Remove class "c" to the element by id */
const removeClass = (id, c) => {
    let x = document.getElementById(id);
    if (x.classList.contains(c))
        x.classList.remove(c);
}


/* addClass(id,c,t)-> Add class "c" after "t" ms to the element by id */
const addClassAfter = (id, c) => {
    let x = document.getElementById(id);
    if (!x.classList.contains(c))
        setTimeout( () => {
            x.classList.add(c);
        }, t, x, c);

}
/* removeClass(id,c)-> Remove class "c"  after "t" msto the element by id */
const removeClassAfter = (id, c, t) => {
    let x = document.getElementById(id);
    if (x.classList.contains(c))
         setTimeout( () => {
            x.classList.remove(c);
        }, t, x, c);
}
/* toggleClass(id,c)-> Toggle class "c" to the element by id */
const toggleClass = (id, c) => {
    let x = document.getElementById(id);
    x.classList.toggle(c);
}

/* updateInput(id,val)-> Update value of the element by id */
const updateInput = (id, val) => {
    document.getElementById(id).value = val;
}


const updateText = (id, text) => {
    document.getElementById(id).textContent = text;
}


/* Aside Menu   */
const showMenu = () => {
    let m = document.getElementById("menuBurger");
    m.classList.remove("scale-out-tr");
    m.classList.add("scale-in-tr");
    m.classList.remove("hidden");
}

const hideMenu = () => {
    let m = document.getElementById("menuBurger");
    m.classList.remove("scale-in-tr");
    m.classList.add("scale-out-tr");
    hiddeAfter(m, 300);
}


/* Disappearing Modal */
const disappearing = (id) => {
    let m = document.getElementById(id);
    show(id);
    addClass(id, 'disappearing');
    hiddeAfter(m, 3000);
}


/* Images carrousel */
const carrousel = (id) => {
    let c = document.getElementById('carrousel').children;
    let id = 0;
    for (let i = 0; i < c.length; i++) {
        if (c[i].classList.contains('img-in')) {
            c[i].classList.remove('img-in');
            c[i].classList.add('img-out');
            id = i;
        }
    }
    id += 1;
    if (id == c.length) id = 0;
    c[id].classList.remove('img-out');
    c[id].classList.add('img-in');
}

const initCarrousel = (id) => {
    let interval = setInterval( () => {
        carrousel(id);
    }, 1500);

}



const addEvent = (element, evnt, funct) => {
    if (element.attachEvent)
        return element.attachEvent('on' + evnt, funct);
    else if (element.addEventListener) {
        return element.addEventListener(evnt, funct, false);
    } else element["on" + evnt] = funct;
}


const addEventClick = (id, funct) => {
    let element = document.getElementById(id);

    if (typeof (element) != 'undefined' && element != null)
        if (element.attachEvent)
            return element.attachEvent('onclick', funct);
        else
            return element.addEventListener('click', funct, false);
    else return;
}


const addEventChange = (id, funct) => {
    let element = document.getElementById(id);
    if (typeof (element) != 'undefined' && element != null)
        if (element.attachEvent)
            return element.attachEvent('onchange', funct);
        else
            return element.addEventListener('change', funct, false);
    else return;
}


const getValue = (id) => {
    let element = document.getElementById(id);
    if (element)
        return element.value;
    else
        return null;
}


const setValue = (id, value) => {
    let element = document.getElementById(id);
    if (element) {
        element.value = value;
        return true;
    } else
        return false;
}

const setText = (id, value) => {
    let element = document.getElementById(id);
    if (element) {
        element.textContent = value;
        return true;
    } else
        return false;
}

//Usage :  document.getElementById("xTable").appendChild(createTableFromObj(
const createTableFromObj = (obj) => {

    let table = document.createElement('table');
    table.classList.add("table");
    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr');
    let keys = Object.keys(obj);
    console.log(keys.length);
    for (let j = 0; j < keys.length; j++) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(keys[j]));

        tableHeadRow.appendChild(th);
    }
    tableHead.appendChild(tableHeadRow);

    let tableBody = document.createElement('tbody');

    for (let i = 0; i < obj[keys[0]].length; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < keys.length; j++) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(obj[keys[j]][i]));
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    return table;
}


//Usage :  document.getElementById("xDiv").appendChild(createTableFromArrObj(
const createTableFromArrObj = (arr) => {
    let table = document.createElement('table');
    table.classList.add("table");
    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr');
    let keys = Object.keys(arr[0]);
    console.log(keys.length);
    for (let j = 0; j < keys.length; j++) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(keys[j]));
        tableHeadRow.appendChild(th);
    }
    tableHead.appendChild(tableHeadRow);
    let tableBody = document.createElement('tbody');

    for (let i = 0; i < arr.length; i++) {
        let tr = document.createElement('tr');

        for (let j = 0; j < keys.length; j++) {
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(arr[i][keys[j]]));
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    return table;
}



const removeAllChildNodes = (id) => {
    let element = document.getElementById(id);
    if (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        return true;
    } else
        return false;
}


const delay = (t) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('')
        }, t);
    })
}
