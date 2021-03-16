<template>
  <div class="self-start text-white space-y-2 text-sm mt-4 mb-10">
    <h1 class="text-xl text-gray-200 font-medium mb-2">
      Personal Info
    </h1>
    <div>
      <p>Known For</p>
      <p class="text-gray-500">{{ knowFor }}</p>
    </div>
    <div>
      <p>Known Credits</p>
      <p class="text-gray-500">{{ creditsCount }}</p>
    </div>
    <div>
      <p>Gender</p>
      <p class="text-gray-500">{{ gender }}</p>
    </div>
    <div>
      <p>Birthdate</p>
      <p class="text-gray-500">
        {{ birthdate }}
      </p>
    </div>
    <div>
      <p>Place of Birth</p>
      <p class="text-gray-500">{{ birthPlace }}</p>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  props: {
    actor: {
      type: Object,
      required: true
    },
    creditsCount: {
      required: true
    }
  },
  computed: {
    gender() {
      return this.actor.gender === 1 ? "Female" : "Male";
    },
    birthdate() {
      return _.get(this.actor, "birthday", "-");
    },
    birthPlace() {
      return _.get(this.actor, "place_of_birth", "-");
    },
    knowFor() {
      return _.get(this.actor, "known_for_department", "-");
    }
  }
};
</script>
