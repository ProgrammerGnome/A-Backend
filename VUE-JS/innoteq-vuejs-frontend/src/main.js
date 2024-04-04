import { createApp } from 'vue'

import App from './App.vue'
import NewSale from './components/new-sale.vue'
import ListAllSales from './components/list-all-sales.vue'
import ReportTwo from './components/report-two.vue'
import ReportThree from './components/report-three.vue'
import ListAllClosedSales from './components/list-all-closed-sales.vue'

const app = createApp(App)
app.component('comp-1', NewSale)
app.component('comp-2', ListAllSales)
app.component('comp-3', ReportTwo)
app.component('comp-4', ReportThree)
app.component('comp-5', ListAllClosedSales)
app.mount('#app')
