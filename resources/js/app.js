import { InertiaApp } from '@inertiajs/inertia-vue'
import Vue from 'vue'
import { InertiaProgress } from '@inertiajs/progress'; 
import VueGraph from 'vue-graph';

InertiaProgress.init({
  // The delay after which the progress bar will
  // appear during navigation, in milliseconds.
  delay: 0,

  // The color of the progress bar.
  color: '#29d',

  // Whether to include the default NProgress styles.
  includeCSS: true,

  // Whether the NProgress spinner will be shown.
  showSpinner: true,
});

InertiaProgress.init();

const app = document.getElementById('app')

Vue.use(VueGraph);

Vue.mixin({
  methods: {
    validationError(field, errors) {
      if(errors) {
        if(errors.hasOwnProperty(field)) {
          return Array.isArray(errors[field]) ? errors[field][0] : errors[field];
        }
      }

      return null;
    },
    calculateBirthday(date){
      var Bday = +new Date(date);
      var age = ((Date.now() - Bday) / (31557600000));

      return Math.trunc(age)
    }
  }
})

const pages = {
  'Login': require('./Pages/Login.vue').default,
  'Users': require('./Pages/Users.vue').default,
  'Patients': require('./Pages/Patients.vue').default,
  'Medicines': require('./Pages/Medicines.vue').default,
  'Patient': require('./Pages/Patient.vue').default,
  'PatientMedicine': require('./Pages/PatientMedicine.vue').default,
  'Maintenance': require('./Pages/Maintenance.vue').default,
  'Reports': require('./Pages/Reports.vue').default,
  'History': require('./Pages/History.vue').default,
  'Trails': require('./Pages/Trails.vue').default,
  'Archives': require('./Pages/Archives.vue').default,
}

new Vue({
  data: {
      route: window.location.protocol + '//' + window.location.host
  },
  render: h => h(InertiaApp, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: name => pages[name],
    },
  }),
}).$mount(app)