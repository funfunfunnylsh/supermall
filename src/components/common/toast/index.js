import Toast from './Toast'

const toast = {}

toast.install = function(Vue){
  
  const toastContrustur = Vue.extend(Toast)
  
  const obj = new toastContrustur()
  
  obj.$mount(document.createElement('div'))
  
  document.body.appendChild(obj.$el)
  
  Vue.prototype.$toast = obj;
  
}

export default toast
