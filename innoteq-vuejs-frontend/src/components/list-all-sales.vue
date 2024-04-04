<template>
  <center>
  <div>
  <br>
  <h4><p style="color: white;">Lezajlott, de még nem lezárt értékesítések</p></h4>
  <p>
  A lezajlott, de még nem lezárt rendeléseket itt tudja megtekinteni és módosítani, lezárni és törölni. 
  Ez a felsorolás a vásárlás pontos ideje szerint van rendezve (legújabbak felül). <br> 
  Ha szeretne utólag új terméket felvenni egy értékesítéshez, kövesse az alábbiakat: <br>
  Adja hozzá azokat az oldal címére kattintva, majd itt a táblázatban legfelűl fog megjelenni, 
  és módosíthatja megfelelőre a dátumidejét.
  </p>
    <table class="table">
      <thead>
        <tr>
          <th><center>Dolgozó neve</center></th>
          <th><center>Vásárlás pontos ideje</center></th>
          <th><center>Terméknév</center></th>
          <th><center>Mennyiség</center></th>
          <th><center>Végösszeg</center></th>
          <th><center>Műveletek</center></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.itemId">
          <td>
            <input type="text" v-model="item.personName" :disabled="!item.editable" />
          </td>
          <td>
            <input type="datetime" v-model="item.datetime" :disabled="!item.editable" />
          </td>
          <td>
            <input type="text" v-model="item.productName" :disabled="!item.editable" />
          </td>
          <td>
            <input type="number" v-model="item.quantity" :disabled="!item.editable" />
          </td>
          <td>
            <input type="number" v-model="item.price" :disabled="!item.editable" />
          </td>
          <td>
            <button @click="editItem(item)">{{ item.editable ? 'Mentem a módosítást' : 'Módosítás' }}</button>
            <button @click="closeItem(item)">{{ item.editable ? 'Mindnképp lezárom' : 'Lezárás' }}</button>
            <button @click="deleteItem(item)">{{ item.editable ? 'Mindenképp törlöm' : 'Törlés' }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </center>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.fetchItemsWithPersonAndSaleData();
  },
  methods: {
    fetchItemsWithPersonAndSaleData() {
  axios
    .get('/items-with-person-and-sale-data')
    .then((response) => {
      this.items = response.data.items.map((item) => {
        return {
          itemId: item[0],
          personId: item[1],
          saleId: item[2],
          personName: item[3],
          datetime: item[4],
          productName: item[5],
          quantity: item[6],
          price: item[7],
          editable: false
        };
      });
    })
    .catch((error) => {
      console.error(error);
    });
},
    editItem(item) {
  if (!item.editable) {
    item.editable = true;
  } else {
    const updatedItem = {
      itemId: item.itemId,
      personId: item.personId,
      saleId: item.saleId,
      personName: item.personName,
      datetime: item.datetime,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price
    };

    axios
      .post('/api/update-item', updatedItem)
      .then(() => {
        console.log('Mentés:', updatedItem);
        item.editable = false;
        alert('Sikeres módosítás!');
      })
      .catch((error) => {
        console.error(error);
      });
  }
},
deleteItem(item) {
  if (!item.editable) {
    item.editable = true;
  } else {
    const deletedItem = {
      itemId: item.itemId,
      personId: item.personId,
      saleId: item.saleId,
      personName: item.personName,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      datetime: item.datetime
    };

    axios
      .post('/api/delete-item', deletedItem)
      .then(() => {
        console.log('Törlés:', deletedItem);
        item.editable = false;
        alert('Sikeres törlés!');
      })
      .catch((error) => {
        console.error(error);
      });
  }
},
closeItem(item) {
  if (!item.editable) {
    item.editable = true;
  } else {
    const closedItem = {
      itemId: item.itemId,
      personId: item.personId,
      saleId: item.saleId,
      personName: item.personName,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      datetime: item.datetime
    };

    axios
      .post('/api/close-item', closedItem)
      .then(() => {
        console.log('Lezárás:', closedItem);
        item.editable = false;
        alert('Sikeres lezárás!');
      })
      .catch((error) => {
        console.error(error);
      });
  }
},
  },
};
</script>

<style scoped>

.table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}

.table td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

table {
  background-color: #B6D6FF;
  padding: 1%;
  width: 100%;
}

div {
  background-color: #4695D6;
}

</style>
