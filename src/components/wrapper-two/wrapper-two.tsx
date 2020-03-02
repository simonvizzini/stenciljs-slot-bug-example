import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "my-wrapper-two",
  styleUrl: "wrapper-two.css"
})
export class WrapperTwo {
  render() {
    return (
      <Host>
        <my-wrapper-one>
          <slot></slot>
        </my-wrapper-one>
      </Host>
    );
  }
}
