type Callback = () => void | Promise<void>;

class OptimizedResizeEvent {
  private callbacks: Callback[] = [];
  private running = false;

  constructor() {
    this.resize.bind(this);
    this.runCallbacks.bind(this);
  }

  private runCallbacks() {
    this.callbacks.forEach(callback => callback());
    this.running = false;
  }

  private resize() {
    if (!this.running) {
      this.running = true;
      setTimeout(() => window.requestAnimationFrame(this.runCallbacks.bind(this)), 500);
    }
  }

  private addCallback(callback: Callback) {
    this.callbacks.push(callback);
  }

  add(callback: Callback) {
    if (!this.callbacks.length)
      window.addEventListener('resize', this.resize.bind(this));
    this.addCallback(callback);
  }
}

export const optimizedResizeEvent = new OptimizedResizeEvent();
