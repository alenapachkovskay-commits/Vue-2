
let app = new Vue({
    el: '#app',
    data: {
        newCard: {
            newTitle: '',
            newItems: ['', '', '']

        },
        columns: [
            {
                columnId: 1,
                columnTitle: "Запланировано",
                maxCards: 3,
                columnCards: [
                    {
                        id: 11,
                        title: '',
                        items: [
                            { text: '', done: false },
                            { text: '', done: false },
                        ]
                    }
                ]
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
    methods: {
        addCard() {
            if (!this.newCard.newTitle.trim()) return;
            const allFilled = this.newCard.newItems.every(item => item.trim());
            if (!allFilled) return;

            const card = {
                id: Date.now(),
                title: this.newCard.newTitle,
                items: this.newCard.newItems.map(text => ({
                    text: text.trim(),
                    done: false
                })),
                completedAt: null
            };

            this.columns[0].columnCards.push(card);
            this.newCard = { newTitle: '', newItems: ['', '', ''] };
        },
        addTaskField() {
            this.newCard.newItems.push('');
        },
        removeTaskField() {
            this.newCard.newItems.pop();
        },
    }
});
