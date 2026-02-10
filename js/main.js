
let app = new Vue({
    el: '#app',
    data: {
        
        columns: [
            {
                columnId: 1,
                columnTitle: "Запланировано",
                maxCards: 3,
                columnCards: [
                    {
                        id: 11,
                        title: "Продукты",
                        items: [
                            { text: "сырр", done: false },
                            { text: "молоко", done: false }
                        ]
                    }
                ]
            },
            {
                columnId: 2,
                columnTitle: "В работе",
                maxCards: 5,
                columnCards: {},

            },
            {
                columnId: 3,
                columnTitle: "Выполнено",
                columnCards: {},

            }
        ]
    },
});
