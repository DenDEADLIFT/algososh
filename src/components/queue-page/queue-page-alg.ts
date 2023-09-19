import { TInput, ElementStates } from '../../types/element-states'

class Queue<T> {
    container: T[] = [];
    head = 0;
    tail = 0;
    readonly size: number = 0;
    length: number = 0;
    private item = { name: "", color: ElementStates.Default };
    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    get items() {
        return [...this.container];
    }

    isEmpty = () => this.length === 0;

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }

        this.container[this.tail % this.size] = item
        this.tail++
        this.length++
    }

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this.container[this.head % this.size] = this.item as any
        this.length--
        this.head++
    };

    clear = () => {
        this.container = Array(this.size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    };

    getContainer = (): T[] => {
        return this.container;
    };
}

export const queue = new Queue<TInput>(7)
