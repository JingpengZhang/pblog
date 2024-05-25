const API_URLS = {
  other: {
    captcha: "/auth/captcha",
  },
  auth: {
    login: "/auth/sign_in",
  },
  file: {
    list: "/file/list",
  },
  folder: {
    children: "/folder/get_children",
    update: "/folder/update",
    create: "/folder/create",
    delete: "/folder/delete",
  },
  category: {
    create: "/category/create",
    list: "/category/list",
    delete: "/category/delete",
    update: "/category/update",
  },
};

export default API_URLS;
