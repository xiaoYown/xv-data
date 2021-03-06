import Vue from 'vue';
import { Icon } from 'ant-design-vue';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '/static/vue/icon/iconfont.js'
});

Vue.component(Icon.name, Icon);
Vue.component('IconSelf', IconFont);

// 向上通知
Vue.prototype['$xv:dispatch'] = function (event, payload) {
  let parent = this.$parent;
  while (this.$parent) {
    parent.$emit(event, payload);
    parent = parent.parent;
  }
};
// 向下广播
Vue.prototype['$xv:broadcast'] = function (event, payload) {
  const broadcast = children => {
    children.forEach(child => {
      child.$emit(event, payload);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.children);
};

export default function (...args) {
  return new Vue(...args);
}
