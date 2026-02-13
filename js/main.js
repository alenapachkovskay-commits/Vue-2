
let app = new Vue({
    el: '#app',
    data: {
        returningCardId: null,
        returnReason: '',
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
                        deadline: "20.02.2026",
                        isEditing: false,
                        returnReason: null,
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
                createdAt: createdAt,
                updatedAt: null,
                isEditing: false,
                returnReason: null,
                status: null
            };
            this.columns[0].cards.push(card);
            this.newCard = { title: '', description: '', deadline: '' };
        },
        startEdit(card) {
            card.isEditing = true;
        },
        saveEdit(card) {
            const now = new Date();
            card.updatedAt = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
            card.isEditing = false;
        },
        cancelEdit(card) {
            card.isEditing = false;
        },
        deleteCard(cardId) {
            const index = this.columns[0].cards.findIndex(c => c.id === cardId);
            if (index !== -1) {
                this.columns[0].cards.splice(index, 1);
            }
        },
        moveToColumn(cardId, targetColumnId) {
            let sourceColumn = null;
            let cardIndex = -1;

            for (const col of this.columns) {
                cardIndex = col.cards.findIndex(c => c.id === cardId);
                if (cardIndex !== -1) {
                    sourceColumn = col;
                    break;
                }
            }

            if (sourceColumn && cardIndex !== -1) {
                const card = sourceColumn.cards.splice(cardIndex, 1)[0];
                const targetColumn = this.columns.find(col => col.id === targetColumnId);

                if (targetColumn) {
                    if (targetColumnId === 4) {
                        const today = new Date();
                        const deadlineDate = new Date(card.deadline);

                        if (deadlineDate < today) {
                            card.status = 'overdue';
                        } else {
                            card.status = 'on-time';
                        }
                    }

                    targetColumn.cards.push(card);
                }
            }
        },
    }
});
