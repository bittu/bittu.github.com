(function (document, window) {
    'use strict';
    var todoapp = {

        todos: [],

        //url: 'http://jsonplaceholder.typicode.com/todos',
        url: 'js/data.json',

        init: function () {
            window.ajax(todoapp.url, function (list) {
                todoapp.todos = JSON.parse(list);
                todoapp.initPagination();
                todoapp.renderPage();
                todoapp.bindEvents();
            });
        },

        template: function (todo, index) {
            return '<li ' + (todo.completed ? 'class="completed"' : '') + '>' +
                '<a href="#" class="tick complete" data-index="' + index + '"></a>' +
                '<span class="item">' + todo.title + '</span>';
        },

        todoElem: document.getElementById("todolist"),

        bindEvents: function () {
            todoapp.todoElem.addEventListener("click", function (e) {
                e.preventDefault();
                if (e.target && e.target.matches("a.complete")) {
                    todoapp.completeTodo(e.target);
                }
            });
            todoapp.pagePrevElem.addEventListener('click', function (e) {
                e.preventDefault();
                todoapp.prevPage();
            });
            todoapp.pageNextElem.addEventListener('click', function (e) {
                e.preventDefault();
                todoapp.nextPage();
            });
        },

        completeTodo: function (elem) {
            elem.parentElement.classList.add('completed');
            todoapp.todos[elem.dataset.index].completed = true;
        },

        currentPage: 1,
        noOfPages: 1,
        noOfItemsPerPage: 5,

        pagePrevElem: document.getElementById('prev'),
        pageNextElem: document.getElementById('next'),
        pageNoElem: document.getElementById('pageNo'),

        initPagination: function () {
            document.body.classList.remove('progress');
            todoapp.noOfPages = todoapp.todos.length / todoapp.noOfItemsPerPage;
        },

        renderPage: function () {
            var i = (todoapp.currentPage - 1) * todoapp.noOfItemsPerPage,
                maxItemsInCurrPage = todoapp.currentPage * todoapp.noOfItemsPerPage,
                docFrag = document.createDocumentFragment(),
                temp;
            for (; i < maxItemsInCurrPage; i++) {
                temp = document.createElement("template");
                temp.innerHTML = todoapp.template(todoapp.todos[i], i);
                docFrag.appendChild(temp.content);
            }
            todoapp.todoElem.innerHTML = '';
            todoapp.todoElem.appendChild(docFrag);
            todoapp.pageNoElem.textContent = todoapp.currentPage;
        },

        prevPage: function () {
            if (!(todoapp.currentPage <= 1)) {
                todoapp.currentPage -= 1;
                todoapp.renderPage();
            }
        },

        nextPage: function () {
            if (!(todoapp.currentPage >= todoapp.noOfPages)) {
                todoapp.currentPage += 1;
                todoapp.renderPage();
            }
        }
    };

    todoapp.init();
})(document, window);



function ajax(url, success) {
    'use strict';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(xhr.responseText);
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    };

    xhr.send(null);
}