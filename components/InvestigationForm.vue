<template>
  <div class="investigation__form">
    <div class="w-100 d-flex header-margin align-items-center">
      <p @click="toggleSidebar" class="icon order-md-2 order-sm-2"><FontAwesomeIcon :icon="['fas', 'bars']" class="icon-bar" /></p>
      <div class="d-flex custom-gap align-items-center order-md-1 order-sm-1">
        <p class="profile__text">Take a tour</p>
        <p class="icon"><FontAwesomeIcon :icon="['fas', 'envelope']" class="icon-small-envelope" /></p>
        <p class="icon"><FontAwesomeIcon :icon="['fas', 'bell']" class="icon-small-bell" /></p>
        <div class="profile-holder">
          <img src="/images/profile.png" alt="profile">
        </div>
      </div>
    </div>
    <div class="d-flex flex-column update-margin">
      <h3 class="update-header">Update Patient Medical Record</h3>
      <p class="update-text">Click the tabs to view and edit patient medical details</p>
    </div>
    <div class="form-container bg-white d-flex flex-column">
      <h5 class="form-header">X-Ray</h5>
      <div class="row">
        <div 
          v-for="(item, index) in groupedInvestigations['X-Ray']" 
          :key="index" 
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
        >
          <div class="form-check">
            <input 
              class="form-check-input" 
              type="checkbox" 
              :id="'checkbox-xray-' + index" 
              v-model="selectedTests.xRay" 
              :value="item.id"
            />
            <label class="form-check-label label-text" :for="'checkbox-xray-' + index">
              {{ item.title }}
            </label>
          </div>
        </div>
      </div>
      <hr class="m-0">

      <h5 class="form-header">Ultrasound Scan</h5>
      <div class="row">
        <div 
          v-for="(item, index) in groupedInvestigations['Ultrasound Scan']" 
          :key="index" 
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
        >
          <div class="form-check">
            <input 
              class="form-check-input" 
              type="checkbox" 
              :id="'checkbox-ultrasound-' + index" 
              v-model="selectedTests.ultrasound" 
              :value="item.id"
            />
            <label class="form-check-label label-text" :for="'checkbox-ultrasound-' + index">
              {{ item.title }}
            </label>
          </div>
        </div>
      </div>
      <hr class="m-0">

      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <label class="form-label text-muted">CT Scan</label>
          <input
            v-model="ctscanDetails"
            class="form-control"
            placeholder="Specify CT Scan details"
          />
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label class="form-label text-muted">MRI</label>
          <input
            v-model="mriDetails"
            class="form-control"
            placeholder="Specify MRI details"
          />
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button 
          class="btn fw-bold text-white px-4 py-2" 
          style="background-color: #382F90; border-radius: 8px;"
          @click="handleSubmit"
        >
          Save and Send
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div class="modal fade" :class="{ show: showSuccessModal }" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="successModalLabel">Success!</h1>
            <button type="button" class="btn-close" @click="showSuccessModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Data saved and sent successfully.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showSuccessModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Failure Modal -->
    <div class="modal fade" :class="{ show: showFailureModal }" id="failureModal" tabindex="-1" aria-labelledby="failureModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="failureModalLabel">Error!</h1>
            <button type="button" class="btn-close" @click="showFailureModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Failed to submit data. Please try again.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showFailureModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, computed, onMounted } from 'vue';
import { gql } from '@apollo/client/core';
import { useNuxtApp } from '#app';

const { $apollo } = useNuxtApp();
const isSidebarVisible = inject('isSidebarVisible');
const showSuccessModal = ref(false);
const showFailureModal = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const investigations = ref([]);
const selectedTests = ref({
  xRay: [],
  ultrasound: [],
});
const ctscanDetails = ref("");
const mriDetails = ref("");

onMounted(async () => {
  try {
    const response = await $apollo.query({
      query: gql`
        query GetInvestigations {
          investigations {
            id
            title
            type {
              id
              title
            }
          }
        }
      `,
    });
    investigations.value = response.data.investigations;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const groupedInvestigations = computed(() => {
  const groups = {};
  investigations.value.forEach((investigation) => {
    const type = investigation.type.title;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(investigation);
  });
  return groups;
});

const handleSubmit = async () => {
  try {
    const submissionData = {
      investigations: [
        ...selectedTests.value.xRay,
        ...selectedTests.value.ultrasound,
      ].map(String),
      ctscan: ctscanDetails.value || "",
      mri: mriDetails.value || "",
      developer: "Developer",
    };

    const response = await $apollo.mutate({
      mutation: gql`
        mutation AddMedicalRecord(
          $investigations: [ID!]!
          $ctscan: String!
          $mri: String!
          $developer: String!
        ) {
          add_medical_record(
            investigations: $investigations
            ctscan: $ctscan
            mri: $mri
            developer: $developer
          ) {
            id
            patient {
              id
              name
              email
            }
            investigations {
              id
              title
              type {
                id
                title
              }
            }
            ctscan
            mri
            created_at
          }
        }
      `,
      variables: {
        investigations: submissionData.investigations,
        ctscan: submissionData.ctscan,
        mri: submissionData.mri,
        developer: submissionData.developer,
      },
    });

    showSuccessModal.value = true;
  } catch (error) {
    console.error('Error submitting data:', error);
    showFailureModal.value = true;
  }
};
</script>

<style scoped>
.investigation__form {
  flex: 1;
  background-color: #F5F5FB;
  padding: 60px 65px;
  height: auto;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.investigation__form::-webkit-scrollbar {
  display: none;
}

.profile__text {
  font-family: Avenir;
  font-weight: 900;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #382F9099;
  margin: 0;
}

.icon {
  font-size: 14px;
  margin: 0;
  cursor: pointer;
}

.icon-small-envelope {
  width: 20px;
  height: 16px;
  color: #382F90;
}

.icon-small-bell {
  width: 16px;
  height: 18px;
  color: #382F9099;
}

.icon-bar {
  width: 32px;
  height: 24px;
  color: #382F90;
  display: none;
}

.profile-holder {
  width: 40px;
  height: 40px;
}

.header-margin {
  margin-bottom: 50px;
  justify-content: flex-end;
}

.update-header {
  font-family: Avenir;
  font-weight: 900;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #382F90;
  margin-bottom: 10px;
}

.update-text {
  font-family: Avenir;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #9FA2B4;
}

.update-margin {
  margin-bottom: 20px;
}

.form-container {
  width: 92%;
  padding: 46.79px 94px;
  border-radius: 5px;
  gap: 15px;
}

.form-header {
  font-family: Avenir;
  font-weight: 900;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #382F90;
}

.custom-gap {
  gap: 1.5rem;
}

.label-text {
  font-family: Lato;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #000000;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal.show {
  display: flex;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

@media (max-width: 1024px) {
  .investigation__form {
    padding: 52px 60px;
  }

  .profile__text {
    font-size: 18px;
  }

  .icon {
    font-size: 16px;
  }

  .header-margin {
    margin-bottom: 30px;
    justify-content: space-between;
  }

  .icon-small-envelope {
    width: 24px;
    height: 19.3px;
  }

  .icon-small-bell {
    width: 17.16px;
    height: 20px;
  }

  .icon-bar {
    display: block;
  }

  .profile-holder {
    width: 50px;
    height: 50px;
  }

  .header-margin {
    margin-bottom: 50px;
  }

  .update-header {
    font-size: 32px;
    margin-bottom: 13px;
  }

  .update-text {
    font-size: 16px;
  }

  .update-margin {
    margin-bottom: 41px;
  }

  .form-container {
    width: 100%;
    padding: 46.71px 90px;
    gap: 25px;
  }

  .form-header {
    font-size: 18px;
  }

  .label-text {
    font-size: 14px;
  }
}

@media (max-width: 600px) {
  .investigation__form {
    padding: 24px;
  }

  .form-container {
    padding: 24px;
  }

  .custom-gap {
    gap: 0.5rem;
  }
}
</style>