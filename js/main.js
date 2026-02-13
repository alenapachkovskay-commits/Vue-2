
let app = new Vue({
    el: '#app',
    data: {
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
                        isEditing: false
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
                    targetColumn.cards.push(card);
                }
            }
        },
        showReturnForm(cardId) {
            this.returningCardId = cardId;
            this.returnReason = '';
          },

          confirmReturn() {
            if (!this.returnReason.trim()) return;

            let card = null;
            for (const col of this.columns) {
              card = col.cards.find(c => c.id === this.returningCardId);
              if (card) break;
            }
          
            if (card) {
              card.returnReason = this.returnReason.trim();
              this.moveToColumn(this.returningCardId, 2);
            }
          
            this.cancelReturn();
          },

          cancelReturn() {
            this.returningCardId = null;
            this.returnReason = '';
          }

    },
});
