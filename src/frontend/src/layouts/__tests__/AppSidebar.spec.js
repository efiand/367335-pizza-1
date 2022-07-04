import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import Vuex from "vuex";
import "@/plugins/ui";
import { generateMockStore } from "@/store/mocks";
import routes from "@/router/routes";
import AppSidebar from "@/layouts/AppSidebar";

const localVue = createLocalVue();
localVue.use(Vuex);

const routeWithSidebarTitles = routes
  .filter((route) => route.meta?.layout)
  .map(({ meta }) => meta.title);

describe("AppSidebar", () => {
  let store;
  let wrapper;

  const createComponent = () => {
    wrapper = mount(AppSidebar, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/orders",
        },
        $router: {
          options: {
            routes,
          },
        },
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".sidebar").exists()).toBeTruthy();
  });

  it("Logo is rendered", () => {
    createComponent();
    expect(wrapper.find(".sidebar__logo").exists()).toBeTruthy();
  });

  it("All links for sidebar-associated routes are rendered", () => {
    createComponent();
    const links = wrapper
      .findAll(".sidebar__link")
      .wrappers.map((wrapper) => wrapper.text());
    expect(links).toEqual(routeWithSidebarTitles);
  });
});
