<template>
  <center>
  <form @submit.prevent="submitForm">
    <h4><p style="color:white;">Új vásárlás rögzítése</p></h4>
    <p>Ugyanazzal a névvel többször leadott rendelés esetén az illetőhöz más-más ID fog tartozni, <br>
    de a dolgozói fogyasztásriportban egy név csak egyszer szerepel.</p>
    <input type="text" v-model="personName" placeholder="Dolgozó neve" required>
    <div v-for="(input, index) in inputs" :key="index">
      <select v-model="input.productName" required>
        <option v-for="option in productOptions" :key="option" :value="option">{{ option }}</option>
      </select>
      <input type="number" v-model="input.quantity" placeholder="Mennyiség" required>
      <button type="button" @click="removeInput(index)">Törlés</button>
    </div>
    <p><button type="button" @click="addInput">Hozzáadás</button></p>
    <button type="submit">Értékesítés leadása</button>
  </form>
  </center>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      personName: '',
      inputs: [
        { quantity: null, productName: null }
      ],
      productOptions: ['szar', 'fos']
    };
  },
  methods: {
    submitForm() {
      const personItemData = {
        personModel: {
          personName: this.personName
        },
        itemModels: this.inputs.map(input => ({
          productName: input.productName,
          quantity: input.quantity
        }))
      };

      axios.post('/save-new-sale', personItemData)
        .then(response => {
          console.log(response.data);
          alert('Mentve az adatbázisba!');
        })
        .catch(error => {
          console.error(error);
        });
    },
    addInput() {
      this.inputs.push({ quantity: null, productName: null });
    },
    removeInput(index) {
      this.inputs.splice(index, 1);
    },
    fetchProductOptions() {
      axios.get('/productInfo')
        .then(response => {
          this.productOptions = response.data.map(product => product.productName);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    this.fetchProductOptions();
    this.addInput(); // Alapból egy mezőt hozzáadunk
  }
};
</script>

<style scoped>
form {
  background-color: #4695D6;
  padding: 1%;
  width: 60%;
}
</style>