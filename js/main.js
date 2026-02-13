
Vue.component('task-card', {
    props: ['card', 'columnId'],
    template: `
      <div class="card">
        <div v-if="card.isEditing" class="edit">
          <input v-model="card.title" placeholder="Заголовок"><br><br>
          <textarea v-model="card.description" placeholder="Описание"></textarea><br><br>
          <label>Дедлайн:</label>
          <input type="date" v-model="card.deadline"><br><br>
          <div class="button">
            <button @click="$emit('save')">Сохранить</button>
            <button @click="$emit('cancel')">Отмена</button>
          </div>
        </div>
        <div v-else>
          <p><strong>Создана:</strong> {{ card.createdAt }}</p>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <p><strong>Дедлайн:</strong> {{ card.deadline }}</p>
          <p v-if="card.updatedAt"><strong>Изменена:</strong> {{ card.updatedAt }}</p>
          <p v-if="card.returnReason">Причина возврата: {{ card.returnReason }}</p>
          <p v-if="card.status" :style="{ color: card.status === 'overdue' ? 'rgb(240, 102, 61)' : 'rgb(42, 161, 42)' }">
            <strong>{{ card.status === 'overdue' ? 'Просрочена' : 'Выполнена в срок' }}</strong>
          </p>
          <div class="button">
            <button v-if="columnId === 1" @click="$emit('edit')">Редактировать</button>
            <button v-if="columnId === 1" @click="$emit('move', 2)">В работу</button>
            <button v-if="columnId === 1" @click="$emit('delete')">Удалить</button>
  
            <button v-if="columnId === 2" @click="$emit('edit')">Редактировать</button>
            <button v-if="columnId === 2" @click="$emit('move', 3)">В тестирование</button>
  
            <button v-if="columnId === 3" @click="$emit('edit')">Редактировать</button>
            <button v-if="columnId === 3" @click="$emit('move', 4)">Выполнено</button>
            <button v-if="columnId === 3" @click="$emit('return')">Вернуть в работу</button>
          </div>
        </div>
      </div>
    `
});

Vue.component('task-column', {
    props: [
        'column',
        'returningCardId',
        'returnReason',
        'newCard'
    ],
    template: `
      <div class="column">
        <h2>{{ column.title }}</h2>
        
        <!-- Форма создания (только в 1-м столбце) -->
        <form v-if="column.id === 1" @submit.prevent="$emit('create')">
          <input v-model="newCard.title" placeholder="Заголовок задачи" required><br><br>
          <textarea v-model="newCard.description" placeholder="Описание задачи" required></textarea><br><br>
          <label>Дедлайн:</label>
          <input type="date" v-model="newCard.deadline" required><br><br>
          <button type="submit">Создать задачу</button>
        </form>
  
        <!-- Карточки -->
        <task-card
          v-for="card in column.cards"
          :key="card.id"
          :card="card"
          :column-id="column.id"
          @edit="$emit('edit-card-start', card)"
          @save="$emit('edit-card-save', card)"
          @cancel="$emit('edit-card-cancel', card)"
          @move="(target) => $emit('move-card', card.id, target)"
          @delete="$emit('delete-card', card.id)"
          @return="$emit('return-form-show', card.id)"
        ></task-card>
  
        <!-- Форма возврата -->
        <div v-if="returningCardId && column.id === 3">
          <label>Причина возврата:</label><br>
          <textarea 
            :value="returnReason" 
            @input="$emit('update:returnReason', $event.target.value)"
            placeholder="Укажите причину..." 
            required
          ></textarea><br><br>
          <button @click="$emit('return-confirm')">Подтвердить</button>
          <button @click="$emit('return-cancel')">Отмена</button>
        </div>
      </div>
    `
});
let app = new Vue({
    el: '#doard',
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
    template: `
    <div class="doard">
      <task-column
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :returning-card-id="returningCardId"
        :return-reason="returnReason"
        :new-card="newCard"
        @create="createCard"
        @move-card="moveToColumn"
        @delete-card="deleteCard"
        @edit-card-start="startEdit"
        @edit-card-save="saveEdit"
        @edit-card-cancel="cancelEdit"
        @return-form-show="showReturnForm"
        @return-confirm="confirmReturn"
        @return-cancel="cancelReturn"
        @update:return-reason="returnReason = $event"
      ></task-column>
    </div>
  `,
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
    }

});
