<template>
  <div class="shadow-sm custom-shadow bg-white vh-100" :class="{ 'sidebar-visible': isSidebarVisible }">
     <p @click="toggleSidebar" class="icon-mobile"><FontAwesomeIcon :icon="['fas', 'times']" class="icon-times" /></p>
    <div class="row m-0">
      <div class="col-12 nav__item_padding active">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'th']" class="icon-small-active" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-white fs-6">DashBoard</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div>
      <div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'user']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Profile</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div><div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'gopuram']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Services</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div><div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'file']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Medical Records</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div><div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'wallet']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Care Wallet</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div><div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'message']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Messages</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div><div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'microchip']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Resourses</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div>
       <hr class="m-0">
      <div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'cog']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Account Settings</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div>
       <div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'headset']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Contact Support</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div>
       <div class="col-12 nav__item_padding">
        <div class="row m-0">
            <div class="col-9 m-0 p-0">
                <div class="row gx-2 m-0 align-items-center">
                    <div class="col-2 m-0 p-0">
                        <p><FontAwesomeIcon :icon="['fas', 'sign-out-alt']" class="icon-small" /></p>
                    </div>
                    <div class="col-8 m-0 p-0">
                        <p class="text-custom fs-6">Logout</p>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const isSidebarVisible = inject('isSidebarVisible');
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

</script>


<style scoped>
.custom-shadow {
  box-shadow: 0px 2px 5px 0px #0000001F !important;
  padding-top: 150px !important;
  width: 309px;
  transition: all .3s;
  overflow-y: auto;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none; 
}

.custom-shadow::-webkit-scrollbar {
  display: none; /* Hides the scrollbar */
}
.nav__item_padding {
    padding: 20px 32px;
}

.active {
    background-color: #2A36A4;
    color: #fff !important;
}

p {
  font-size: 16px;
  margin: 0;

}
.icon-small {
    width: 16px;
  height: 16px;
  color: #A0A0A0;
}

.icon-small-active {
    width: 16px;
  height: 16px;
    color: #ffffff;
}

.text-custom {
    font-family: Product Sans;
font-weight: 400;
font-size: 16px;
line-height: 100%;
letter-spacing: 0%;

    color: #A0A0A0;
}

.icon-mobile {
    width: 16px;
  height: 16px;
  display: none;
}
.sidebar-visible {
  transform: translateX(0) !important;
  z-index: 100;
}

@media (max-width: 1024px) {
  .custom-shadow {
    position: fixed;
    transform: translateX(-100%);
  }
}



@media (max-width: 600px) {
     .custom-shadow {
    width: 100%;
  }
    .icon-mobile {
    width: 16px;
  height: 16px;
  display: block;
  position: absolute;
  top: 20px;
  right: 20px;
}
.icon-times {
  width: 32px; /* Reduced icon size for smaller screens */
  height: 32px;
  color: #382F90;
}
}
</style>