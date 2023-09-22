import { ILinkedList } from '../../types/element-states'

class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value
    this.next = next === undefined ? null : next
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null
  private size: number

  constructor(arr: T[]) {
    this.head = null
    this.size = 0
    arr.map(i => this.prepend(i))
  }

  get getSize(): number {
    return this.size
  }

  get container(): T[] {
    return this.toContainer()
  }

  get getHead() {
    return this.container[0]
  }

  get getTail() {
    return this.container[this.container.length - 1]
  }

  prepend = (i: T): void => {
    const node = new LinkedListNode<T>(i)
    if (!this.isEmpty()) {
      node.next = this.head
      this.head = node
    }
    this.head = node
    this.size++
  }

  append = (i: T): void => {
    const node = new LinkedListNode<T>(i)
    if (this.head === null) {
      this.head = node
    }
    if (!this.isEmpty()) {
      let prev = this.head
      while (prev?.next) {
        prev = prev.next
      }
      prev.next = node
    }
    this.size++
  }

  addIndex = (e: T, i: number | null): void => {
    if (i && (i < 0 || i > this.size)) {
      return
    } else {
      const newNode = new LinkedListNode<T>(e)
      if (i === 0) {
        newNode.next = this.head
        this.head = newNode
      } else {
        let curr = this.head
        let currIndex = 0
        let prev = null
        while (i && currIndex < i) {
          prev = curr
          curr = curr!.next
          currIndex++
        }
        newNode.next = curr
        prev!.next = newNode
      }
      this.size++
    }
  }

  deleteIndex = (i: number | null): void => {
    if (i && (i < 0 || i >= this.size)) return
    let curr,
      prev,
      counter = 0
    curr = this.head
    prev = curr
    if (i == 0) {
      this.head = curr ? curr : null
    } else {
      while (i && (counter < i)) {
        counter++;
        prev = curr
        if (curr) {
          curr = curr.next
        }
      }
      if (prev) {
        prev.next = curr ? curr.next : null
      }
    }
    this.size--
  }

  deleteHead = (): void => {
    if (!this.head) {
      return
    }
    this.head = this.head.next
    this.size--
  }

  deleteTail = (): void => {
    let curr = this.head
    let prev
    while (curr?.next) {
      prev = curr
      curr = curr.next
    }
    if (prev?.next) {
      prev.next = null
    }
    this.size--
  }

  toContainer = (): T[] => {
    const array = []
    let curr = this.head
    while (curr) {
      array.push(curr.value)
      curr = curr.next
    }
    return array
  }

  isEmpty = (): boolean => this.getSize === 0

  getByIndex = (i: number) => {
    return this.container[i]
  }
}