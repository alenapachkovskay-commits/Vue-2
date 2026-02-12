
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
    methods: {
        addCard() {
            this.formError = '';
            if (this.columns[0].columnCards.length >= 3) {
                this.formError = "STOOOOOP 3 IS ENOTH";
                return;
            }
            if (!this.newCard.newTitle.trim()) {
                this.formError = "U DONT HAVE TITLE!";
                return;
            }

            const allFilled = this.newCard.newItems.every(item => item.trim());
            if (!allFilled) {
                this.formError = "ALL TASK SHULLB BE FULL!";
                return;
            }
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
