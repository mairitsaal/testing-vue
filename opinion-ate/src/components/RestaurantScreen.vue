<template>
  <div>
    <h1>RestaurantScreen</h1>
    <RestaurantList />
  </div>
</template>

<script>
import RestaurantList from '@/components/RestaurantList';

export default {
  name: 'RestaurantScreen',
  components: {RestaurantList},
};
</script>
