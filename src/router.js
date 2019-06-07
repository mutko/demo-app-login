import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import Welcome from "./components/Welcome.vue";
import PasswordForgoten from "./components/PasswordForgoten.vue";
import PasswordSent from "./components/PasswordSent.vue";
import Dashboard from "./components/Dashboard.vue";

export const routes = [
  {
    path: "/",
    component: SignIn
  },
  {
    path: "/signup",
    component: SignUp
  },
  {
    path: "/welcome",
    component: Welcome
  },
  {
    path: "/nopassword",
    component: PasswordForgoten
  },
  {
    path: "/passwordsent",
    component: PasswordSent
  },
  {
    path: "/dashboard",
    component: Dashboard
  }
];
