import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  Vue.use(Vuetify);

  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let wrapper;

  const mountWithStore = (state = {records, loading: false}) => {
    restaurantsModule = {
      namespaced: true,
      state,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    wrapper = mount(RestaurantList, {localVue, store});
  };

  describe('when loading success', () => {
    beforeEach(() => {
      mountWithStore();
    });
  });

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });

  const findByTestId = (wrapper, testId, index) =>
      wrapper.findAll(`[data-testid="${testId}"]`).at(index);

  it('displays the restaurants', () => {
    expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
    expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
  });

  it('displays the loading indicator while loading', () => {
    mountWithStore({loading: true});
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(true);
  });

  it('does not display the loading indicator while not loading', () => {
    mountWithStore();
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(false);
  });

});
