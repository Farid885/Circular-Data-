function createCircularQueue(k) {
  const queue = new Array(k).fill(null);
  let bash = -1;
  let quyruq = -1;

  function enqueue(data) {
    // Ilkin data elavesi
    if (bash === -1 && quyruq === -1) {
      bash++;
      quyruq++;
      queue[quyruq] = data;
    } else if ((quyruq + 1) % k === bash) {
      console.log("The circular queue is full");
    } else {
      quyruq = (quyruq + 1) % k;
      queue[quyruq] = data;
    }
  }

  new Set([1, 2, 3, 4, 1]);

  function dequeue() {
    if (bash === -1) {
      console.log("The circular queue is empty");
    } else if (bash === quyruq) {
      const temp = queue[bash];
      bash = -1;
      quyruq = -1;
      return temp;
    } else {
      const temp = queue[bash];
      bash = (bash + 1) % k;
      return temp;
    }
  }

  function printCQueue() {
    if (bash === -1) {
      console.log("No element in the circular queue");
    } else if (quyruq >= bash) {
      for (let i = bash; i <= quyruq; i++) {
        console.log(queue[i]);
      }
    } else {
      for (let i = bash; i < k; i++) {
        console.log(queue[i]);
      }
      for (let i = 0; i <= quyruq; i++) {
        console.log(queue[i]);
      }
    }
  }

  return {
    enqueue,
    dequeue,
    printCQueue,
  };
}

const circularQueue = createCircularQueue(5);
circularQueue.enqueue("a");
circularQueue.enqueue("b");
circularQueue.enqueue("c");
circularQueue.enqueue("d");
circularQueue.enqueue("e");
console.log("Initial queue");
circularQueue.printCQueue();

// circularQueue.dequeue();
// circularQueue.dequeue();

// circularQueue.enqueue("g");
// circularQueue.enqueue("h");

console.log("After removing an element from the queue");
circularQueue.printCQueue();
