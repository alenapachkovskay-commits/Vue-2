
let app = new Vue({
    el: '#app',
    data: {
        newCard: {
            title: '',
            description: '',
            deadline: ''
          },
        columns: [
            {
                id: 1,
                title: "Запланированные задачи",
                cards: [
                    {
                        id: 101,
                        title: "Рефакторинг модуля авторизации",
                        description: "Переписать код на Vue 3, убрать глобальные переменные.",
                        createdAt: "13.02.2026",
                        deadline: "20.02.2026"
                    }
                ]
            },
            {
                id: 2,
                title: "Задачи в работе",
                cards: []
            },
            {
                id: 3,
                title: "Тестирование",
                cards: []
            },
            {
                id: 4,
                title: "Выполненные задачи",
                cards: []
            },
        ]
    },

});
