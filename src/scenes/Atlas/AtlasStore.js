import { observable, action } from 'mobx';
import { client } from 'utils/ApiClient';

const store = new class AtlasStore {
  @observable atlas;

  @observable isFetching = true;

  /* Actions */

  @action fetchAtlas = async (id, successCallback) => {
    this.isFetching = true;
    this.atlas = null;

    try {
      const res = await client.post('/atlases.info', { id: id });
      const { data } = res;
      this.atlas = data;
      successCallback(data);
    } catch (e) {
      console.error("Something went wrong");
    }
    this.isFetching = false;
  }
}();

export default store;