import { createApp } from "vue";
import app from "./app.vue";
import router from "./router";

import TDesign from "@/index";

import "../styles/index.less";

createApp(app)
  .use(TDesign)
  .use(router)
  .component("spfx-demo", import("./components/demo.vue"))
  .mount("#app");
