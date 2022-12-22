export const create_sidebar_slice = (set) => ({
  is_sidebar_open: false,
  open_sidebar: () =>
    set({
      is_sidebar_open: true,
    }),
  close_sidebar: () =>
    set({
      is_sidebar_open: false,
    }),
})
