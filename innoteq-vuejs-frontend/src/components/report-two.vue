<template>
  <center>
  <div>
    <h2><p style="color: white;">Dolgozói fogyasztásriport</p></h2>
    <h4>A jelenlegi hónap: {{ currentMonth }}</h4>
    <table class="table">
      <thead>
        <tr>
          <th><center>Dolgozó neve</center></th>
          <th><center>Fogyasztás értéke</center></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(person, index) in persons" :key="index">
          <td><center>{{ person[0] }}</center></td>
          <td><center>{{ person[1] }}</center></td>
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
      persons: [],
      currentMonth: '',
    };
  },
  mounted() {
    this.fetchPersonSalesByCurrentMonth();
    const currentDate = new Date();
    const monthNames = [
      'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
      'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'
    ];
    this.currentMonth = monthNames[currentDate.getMonth()];
  },
  methods: {
    fetchPersonSalesByCurrentMonth() {
      axios
        .get('/2feladat')
        .then((response) => {
          this.persons = response.data.persons;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;
}

.table th,
.table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}
</style>

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
