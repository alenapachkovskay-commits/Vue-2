
let app = new Vue({
    el: '#app',
    data: {
        newCard: {
            newTitle: '',
            newItems: ['', '', '']

        },
        formError: '',
        columns: [
            {
                columnId: 1,
                columnTitle: "Запланировано",
                maxCards: 3,
                columnCards: [],
            },
            {
                columnId: 2,
                columnTitle: "В работе",
                maxCards: 5,
                columnCards: [],

            },
            {
                columnId: 3,
                columnTitle: "Выполнено",
                columnCards: [],

            }
        ]
    },

});
