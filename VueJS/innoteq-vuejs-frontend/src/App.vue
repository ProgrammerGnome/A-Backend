<template>
<!DOCTYPE html>
<html lang="hu">
<head>
    <title>WELCOME</title>
</head>
<body>
<center><p>Eddig a következő funkciók érhetőek el: <br>
  <a href="#" @click="switchToComp1">Új vásárlás rögzítése</a> ||
  <a href="#" @click="switchToComp2">Lezajlott, de még nem lezárt értékesítések</a> ||
  <a href="#" @click="switchToComp3">Dolgozói fogyasztásriport</a> ||
  <a href="#" @click="switchToComp4">Termékek fogyásának riportja</a> ||
  <a href="#" @click="switchToComp5">Lezárt értékesítések</a> ||
  </p></center>
<div class="container p-1 bg-primary text-white text-center">
  <h1><a href="#" @click="switchToComp1" style="color: white;">InnoTeq junior tesztfeladata</a></h1>
  <p>Bootstrap Page with Vue.js ---> Resize this responsive page to see the effect!</p> 
</div>
  <center>
  <p></p>
  <p>Üzemi étkezdei szoftver<br>
  Egy felület az értékesítések és különféle riportok számára.</p>
  </center>
  <p></p>
  <center>
    <button @click="switchComponentL">Mutasd az előzőt!</button>
    <button @click="switchComponentR">Mutasd a következőt!</button>
  </center>
  <p></p>
  <Transition mode="out-in">
    <component :is="activeComp"></component>
  </Transition>
</body>
</html>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
export default {
  data() {
    return {
      components: ['comp-1', 'comp-2', 'comp-3', 'comp-4', 'comp-5'],
      activeIndex: 0,
    };
  },
  computed: {
    activeComp() {
      return this.components[this.activeIndex];
    },
  },
  methods: {
    switchComponentR() {
      this.activeIndex = (this.activeIndex + 1) % this.components.length;
    },
    switchComponentL() {
      this.activeIndex = (this.activeIndex - 1 + this.components.length) % this.components.length;
    },
    switchToComp1() {
      this.activeIndex = this.components.indexOf('comp-1');
    },
    switchToComp2() {
      this.activeIndex = this.components.indexOf('comp-2');
    },
    switchToComp3() {
      this.activeIndex = this.components.indexOf('comp-3');
    },
    switchToComp4() {
      this.activeIndex = this.components.indexOf('comp-4');
    },
    switchToComp5() {
      this.activeIndex = this.components.indexOf('comp-5');
    },
  },
};
</script>

<style>
  .v-enter-active {
    animation: slideIn 0.5s;
  }
  @keyframes slideIn {
    from {
      translate: -200px 0;
      opacity: 0;
    }
    to {
      translate: 0 0;
      opacity: 1;
    }
  }
  .v-leave-active {
    animation: slideOut 0.5s;
  }
  @keyframes slideOut {
    from {
      translate: 0 0;
      opacity: 1;
    }
    to {
      translate: 200px 0;
      opacity: 0;
    }
  }
  #app {
    width: 100%;
    margin-top: 1%;
    padding-right: 3%;
    padding-left: 3%;
  }
  #app > div {
    border: solid black 2px;
    padding: 10px;
    margin-top: 10px;
  }
  .container {
    width: 60%;
  }
  body {
    background-color: #E6E6FA;
  }
</style>
