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
      subtree: true
    });
    this.mutationObserver = observer;
  }

  componentDidUnload() {
    this.mutationObserver.disconnect();
  }

  @State() count: number = 0;
  private handleClick = () => {
    this.count += 1;
  };

  render() {
    const yellowBg = this.count % 2 === 0;

    return (
      <div ref={ref => (this.containerRef = ref)}>
        <button type="button" onClick={this.handleClick}>
          Increase
        </button>
        {this.useWrapperTwo ? (
          <my-wrapper-two>
            <div class={{ content: true, alternate: yellowBg }}>
              Count: (<span>{this.count}</span>)
            </div>
          </my-wrapper-two>
        ) : (
          <my-wrapper-one>
            <div class={{ content: true, alternate: yellowBg }}>
              Count: (<span>{this.count}</span>)
            </div>
          </my-wrapper-one>
        )}
      </div>
    );
  }
}
