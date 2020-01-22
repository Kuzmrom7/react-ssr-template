import App from "./app";
import { Main, About, NotFound } from "./app/pages";

const action = {
  get: (params = "", q = "") =>
    console.log("action - params = ", params, " - qqqq = ", q)
};

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Main, // Add your route here
        loadData: () => [action.get()]
      },
      {
        path: "/about/:id",
        component: About,
        loadData: ({
          params,
          query
        }: {
          params: { id: string };
          query: string;
        }) => [action.get(params.id, query)]
      },
      {
        component: NotFound
      }
    ]
  }
];
