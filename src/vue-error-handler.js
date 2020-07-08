import Vue from 'vue';
require('./mixins/shared');

Vue.config.errorHandler = (error, vm, info) => {
   // debugger
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.
  
  // TODO: Perform any custom logic or log to server
   // this.showError(error); 

};