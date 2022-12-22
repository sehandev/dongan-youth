export const create_group_slice = (set) => ({
  group: -1,
  change_group: (group) =>
    set({
      group: group,
    }),
})
