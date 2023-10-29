import { defineStore } from 'pinia'
import { useFirestore } from '@/composables/useFirestore'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    nick: '',
  }),
  actions: {
    async list(collection, where = [['active', '==', true]], startAfter, limit = 25) {
      const { list } = useFirestore()
      try {
        const data = await list(collection,
          {
            where: where,
            startAfter: startAfter,
            limit: limit
          })
        this[collection] = data ? data : null
        this.error = null;
        console.log('Length ✅: ', data.length);
        return this[collection]
      } catch (e) {
        this[collection] = []
        this.error = e;
        return false;
      }
    },
    async add(collection, payload) {
      const { add } = useFirestore()
      console.log(collection, payload)
      try {
        const data = await add(collection, payload)
        this.error = null;
        console.log('Add ✅: ', data.id)
        return data.id;
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async get(collection, id) {
      const { get } = useFirestore()
      try {
        const snap = await get(collection, id)
        this.error = null
        return snap
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async set(collection, id, payload) {
      const { set } = useFirestore()
      try {
        const res = await set(collection, id, payload)
        this.error = null;
        console.log('Set ✅: ', res)
        return res;
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async update(collection, id, payload) {
      const { update } = useFirestore()
      try {
        const res = await update(collection, id, payload)
        this.error = null;
        console.log('Update ✅: ', res)
        return res;
      } catch (e) {
        this.error = e;
        return false;
      }
    },
    async remove(collection, id) {
      const { remove } = useFirestore()
      try {
        const res = await remove(collection, id)
        this.error = null;
        console.log('Remove ✅: ', res)
        return res;
      } catch (e) {
        this.error = e;
        return false;
      }
    },

  },
})
