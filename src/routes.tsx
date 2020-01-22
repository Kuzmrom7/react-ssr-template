import App from "./app";
import { Main, About, NotFound } from "./app/pages";
import { fetchUsers } from "./app/actions";

export default [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Main, // Add your route here
        loadData: () => [fetchUsers()]
      },
      {
        path: "/about",
        component: About
        // loadData: ({
        //   params,
        //   query
        // }: {
        //   params: { id: string };
        //   query: string;
        // }) => [action.get(params.id, query)]
      },
      {
        component: NotFound
      }
    ]
  }
];
