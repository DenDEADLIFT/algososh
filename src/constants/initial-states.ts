import { TinitialLoader } from '../types/element-states'

export const initialStateList: TinitialLoader = {
    changedIndexes: null,
    updatedIndexes: null,
    indexAtTopCircle: -1,
    circleLetterAtTop: '',
    indexAtBottomCircle: -1,
    circleLetterAtBottom: '',
    addingHead: false,
    addingTail: false,
    deletingHead: false,
    deletingTail: false,
    addingByIndex: false,
    deletingByIndex: false,
}

export const initialLoaderQueue: TinitialLoader = {
    add: false,
    delete: false,
    clear: false,
}

export const initialLoaderStack: TinitialLoader = {
    add: false,
    delete: false,
    clear: false,
}