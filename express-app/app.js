import express from "express";
import fs from "fs/promises";

const myApp = express();

const products = [];

async function hydrateData() {
  const fileContents = await fs.readFile("products.json");
  
  const stringContent = fileContents.toString();
  products.push(...JSON.parse(stringContent));
}

myApp.use(express.json());

myApp.get("/api/farid", (req, res) => {
  res.send({
    message: "Hello world",
  });
});

myApp.post("/api/add-product", async (req, res) => {
  const product = req.body;

  if ("id" in product && "name" in product) {
    products.push(req.body);

    await fs.writeFile("products.json", JSON.stringify(products, null, 2));

    res.send({
      message: "Product successfully added",
    });
  } else {
    res.status(400).send({
      message: "Invalid data",
    });
  }
});

myApp.get("/api/product-list", (req, res) => {
  res.send(products);
});

hydrateData().then(() => {
  myApp.listen(5005, () => {
    console.log("app started at 5005 port");
  });
});





// // Stack implementation in C++

// #include <stdlib.h>
// #include <iostream>

// using namespace std;

// #define MAX 10
// int size = 0;

// // Creating a stack
// struct stack {
//   int items[MAX];
//   int top;
// };
// typedef struct stack st;

// void createEmptyStack(st *s) {
//   s->top = -1;
// }

// // Check if the stack is full
// int isfull(st *s) {
//   if (s->top == MAX - 1)
//     return 1;
//   else
//     return 0;
// }

// // Check if the stack is empty
// int isempty(st *s) {
//   if (s->top == -1)
//     return 1;
//   else
//     return 0;
// }

// // Add elements into stack
// void push(st *s, int newitem) {
//   if (isfull(s)) {
//     cout << "STACK FULL";
//   } else {
//     s->top++;
//     s->items[s->top] = newitem;
//   }
//   size++;
// }

// // Remove element from stack
// void pop(st *s) {
//   if (isempty(s)) {
//     cout << "\n STACK EMPTY \n";
//   } else {
//     cout << "Item popped= " << s->items[s->top];
//     s->top--;
//   }
//   size--;
//   cout << endl;
// }

// // Print elements of stack
// void printStack(st *s) {
//   printf("Stack: ");
//   for (int i = 0; i < size; i++) {
//     cout << s->items[i] << " ";
//   }
//   cout << endl;
// }

// // Driver code
// int main() {
//   int ch;
//   st *s = (st *)malloc(sizeof(st));

//   createEmptyStack(s);

//   push(s, 1);
//   push(s, 2);
//   push(s, 3);
//   push(s, 4);

//   printStack(s);

//   pop(s);

//   cout << "\nAfter popping out\n";
//   printStack(s);
// }
