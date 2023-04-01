//import views here, then route down below
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OptionView from '../views/OptionView.vue'
import SelectionView from '../views/SelectionView.vue'
import GameView from '../views/GameView.vue'
import InstructionView from '../views/InstructionView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/option',
    name: 'Option',
    component: OptionView
  },
  {
    path: '/selection',
    name: 'Selection',
    component: SelectionView
  },
  {
    path: '/game',
    name: 'Game',
    component: GameView
  },
  {
    path: '/instruction',
    name: 'Instruction',
    component: InstructionView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
