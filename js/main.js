
let app = new Vue({
    el: '#app',
    data: {
        editingCardId: null,
        editForm: {
            title: '',
            description: '',
            deadline: ''
        },
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
    methods: {
        createCard() {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear();
            const createdAt = `${day}.${month}.${year}`;
            const card = {
                id: Date.now(),
                title: this.newCard.title,
                description: this.newCard.description,
                deadline: this.newCard.deadline,
                createdAt: createdAt
            };
            this.columns[0].cards.push(card);
            this.newCard = { title: '', description: '', deadline: '' };
        },
        startEdit(cardId) {
            this.editingCardId = cardId;
        },

        saveEdit(cardId) {
            this.editingCardId = null;
        },

        cancelEdit() {
            this.editingCardId = null;
        },

        deleteCard(cardId) {
            const index = this.columns[0].cards.findIndex(c => c.id === cardId);
            if (index !== -1) {
                this.columns[0].cards.splice(index, 1);
            }
        }
    },
});
