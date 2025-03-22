import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faEnvelope,
  faSave,
  faCheck,
  faDashboard,
  faMessage,
  faEnvelopeSquare,
  faBell,
  faBars,
  faTimes,
  faTh,
  faGopuram,
  faFile,
  faWallet,
  faMicrochip,
  faCog,
  faHeadset,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

// Add icons to the library
library.add(
  faUser,
  faEnvelope,
  faSave,
  faCheck,
  faDashboard,
  faMessage,
  faEnvelopeSquare,
  faBell,
  faBars,
  faTimes,
  faTh,
  faGopuram,
  faFile,
  faWallet,
  faMicrochip,
  faCog,
  faHeadset,
  faSignOutAlt
);

// Configure Font Awesome to use Vue components
config.autoAddCss = false;

// Export the FontAwesomeIcon component
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});
