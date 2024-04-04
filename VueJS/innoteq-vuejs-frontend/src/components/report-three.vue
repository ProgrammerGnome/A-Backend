<template>
  <center>
  <div>
    <h2><p style="color: white;">Termékek fogyásának riportja</p></h2>
    <p>Rendezve a fogyás mennyiségére fordítottan (legnagyobbak felül).</p>
    <h4>A jelenlegi hónap: {{ currentMonth }}</h4>
    <table class="table">
      <thead>
        <tr>
          <th><center>Terméknév</center></th>
          <th><center>Fogyás mennyisége</center></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sale, index) in sales" :key="index">
          <td><center>{{ sale[0] }}</center></td>
          <td><center>{{ sale[2] }}</center></td>
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
      sales: [],
      currentMonth: '',
    };
  },
  mounted() {
    this.fetchProcuctQuantityByCurrentMonth();
    const currentDate = new Date();
    const monthNames = [
      'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ];
    this.currentMonth = monthNames[currentDate.getMonth()];
  },
  methods: {
    fetchProcuctQuantityByCurrentMonth() {
      axios
        .get('/3feladat')
        .then((response) => {
          this.sales = response.data.sales;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>

div {
  background-color: #4695D6;
  padding: 1%;
  width: 60%;
}

table {
  background-color: white;
  width: 100%;
}

</style>
