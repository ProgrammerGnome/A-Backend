<template>
  <center>
  <div>
    <br>
    <h4>Lezárt értékesítések</h4>
    <p>A lezárás pontos ideje szerint rendezve (legrégebben lezártak alul).</p>
    <table class="table">
      <thead>
        <tr>
          <th><center>Dolgozó neve</center></th>
          <th><center>Terméknév</center></th>
          <th><center>Mennyiség</center></th>
          <th><center>Végösszeg</center></th>
          <th><center>Vásárlás pontos ideje</center></th>
          <th><center>Lezárás pontos ideje</center></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td><center>{{ item[1] }}</center></td>
          <td><center>{{ item[2] }}</center></td>
          <td><center>{{ item[3] }}</center></td>
          <td><center>{{ item[4] }}</center></td>
          <td><center>{{ item[5] }}</center></td>
          <td><center>{{ item[6] }}</center></td>
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
        .get('/closed-sale-table')
        .then((response) => {
          this.items = response.data.items;
        })
        .catch((error) => {
          console.error(error);
        });
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
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

div {
  background-color: red;
}

</style>
