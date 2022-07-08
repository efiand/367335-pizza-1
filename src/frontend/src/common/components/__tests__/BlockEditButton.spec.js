import { shallowMount } from "@vue/test-utils";
import BlockEditButton from "@/common/components/BlockEditButton";

describe("BlockEditButton", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BlockEditButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("button.edit").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    const textWrapper = wrapper.find("span.visually-hidden");
    expect(textWrapper.html()).toContain(slots.default);
  });

  it("Raises the click event on click", async () => {
    createComponent();

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("Button type is button by default but is submit after adding prop", async () => {
    createComponent();
    expect(wrapper.attributes("type")).toBe("button");

    const type = "submit";
    await wrapper.setProps({ type });
    expect(wrapper.attributes("type")).toBe(type);
  });
});
