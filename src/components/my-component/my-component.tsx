import {
  Component,
  h,
  State,
  Prop,
  ComponentInterface,
  ComponentDidUnload
} from "@stencil/core";

@Component({
  tag: "my-component",
  styleUrl: "my-component.css"
})
export class MyComponent implements ComponentInterface, ComponentDidUnload {
  private containerRef!: HTMLDivElement;
  private mutationObserver!: MutationObserver;

  @Prop() useWrapperTwo?: boolean;

  componentDidLoad() {
    const observer = new MutationObserver(mutations => {
      console.log("mutations", mutations);
    });
    observer.observe(this.containerRef, {
      childList: true,
      subtree: true,
      attributes: true
    });
    this.mutationObserver = observer;
  }

  componentDidUnload() {
    this.mutationObserver.disconnect();
  }

  @State() count: number = 0;
  private increase = () => {
    this.count += 1;
  };

  render() {
    return (
      <div ref={ref => (this.containerRef = ref)}>
        <button type="button" onClick={this.increase}>
          Increase
        </button>
        {this.useWrapperTwo ? (
          <my-wrapper-two>
            <div>
              Count: (<span>{this.count}</span>)
            </div>
          </my-wrapper-two>
        ) : (
          <my-wrapper-one>
            <div>
              Count: (<span>{this.count}</span>)
            </div>
          </my-wrapper-one>
        )}
      </div>
    );
  }
}
