import create from 'zustand'
import { create_date_slice } from './date'
import { create_group_slice } from './group'
import { create_sidebar_slice } from './sidebar'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...create_date_slice(...a),
      ...create_group_slice(...a),
      ...create_sidebar_slice(...a),
    }),
    { name: 'bound-store', storage: createJSONStorage(() => sessionStorage) },
  ),
)
