class _ListService extends EventTarget {
    constructor() {
        super();
        
        this._nextId = 0;
        this._list = [];
    }

    get list() {
        return this._list;
    }

    addItem(text, color) {
        this._list.push({id:this._nextId, text:text, color:color});
        this._nextId++;
        this.dispatchEvent(new CustomEvent('change'));
    }

    removeItem(id) {
        const idx = this._list.findIndex(i => i.id == id);
        if (idx !== -1) {
            this._list.splice(idx, 1);
            this.dispatchEvent(new CustomEvent('change'));
        }
    }
}

export const ListService = new _ListService();