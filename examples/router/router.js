import Vue from 'vue';
import Router from 'vue-router';
Vue.use (Router);

import App from '../App.vue';

const Home = () => import ('../views/Home.vue');

const Icon = () => import ('../views/Icon.vue');

const Button = () => import ('../views/Button.vue');

const Input = () => import ('../views/Input.vue');
const InputNumber = () => import ('../views/InputNumber.vue');
const Radio = () => import ('../views/Radio.vue');
const Checkbox = () => import ('../views/Checkbox.vue');
const Uploader = () => import ('../views/Uploader.vue');
const Form = () => import ('../views/Form.vue');

const Toast = () => import ('../views/Toast.vue');
const Modal = () => import ('../views/Modal.vue');

const MessageBox = () => import ('../views/MessageBox.vue');
const Message = () => import ('../views/Message.vue');

const routes = [
  {
    path: '/',
    component: App, // 一级路由不要写name属性
    children: [
      {
        path: '/home',
        redirect: '/',
      },
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/icon',
        name: 'icon',
        component: Icon,
      },
      {
        path: '/button',
        name: 'button',
        component: Button,
      },
      {
        path: '/input',
        name: 'input',
        component: Input,
      },
      {
        path: '/inputnumber',
        name: 'inputnumber',
        component: InputNumber,
      },
      {
        path: '/toast',
        name: 'toast',
        component: Toast,
      },
      {
        path: '/modal',
        name: 'modal',
        component: Modal,
      },
      {
        path: '/messagebox',
        name: 'messagebox',
        component: MessageBox,
      },
      {
        path: '/message',
        name: 'message',
        component: Message,
      },
      {
        path: 'radio',
        name: 'radio',
        component: Radio,
      },
      {
        path: 'checkbox',
        name: 'checkbox',
        component: Checkbox,
      },
      {
        path: 'uploader',
        name: 'uploader',
        component: Uploader,
      },
      {
        path: 'form',
        name: 'form',
        component: Form,
      },
    ],
  },
];

export default new Router ({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0};
  },
});
