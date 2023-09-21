import { TInput } from '../../types/element-states'

interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
}

class Stack<T> implements IStack<T> {
    private container: T[] = [];

    get items() {
        return [...this.container];
    }

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        if (this.getSize() > 0) {
            this.container.pop();
        }
    };

    peak = (): T | null => {
        if (this.getSize() > 0) {
            return this.container[this.getSize() - 1];
        } else {
            return null;
        }
    };

    clear = () => {
        this.container = [];
    }

    getSize = () => this.container.length;
}

export const stack = new Stack<TInput>();