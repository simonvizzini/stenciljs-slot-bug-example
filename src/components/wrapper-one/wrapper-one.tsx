import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "my-wrapper-one",
  styleUrl: "wrapper-one.css"
})
export class WrapperOne {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
