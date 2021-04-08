class HashTable {
  hashtableLength = 0;
  constructor(hashtableLength) {
    this.hashtableLength = hashtableLength;
    this.associationList = Array(hashtableLength);
    this.arrayStore = Array(hashtableLength);
    this.structStore = Array(hashtableLength);
  }

  hash(key) {
    let hashed = 0;
    for (let i = 0; i < key.length; i++) {
      hashed += key.charCodeAt(i);
    }
    return hashed % this.hashtableLength;
  }

  addToAllHashTables(data) {
    this.addToAssociationList(data);
    this.addToArrayStore(data);
    this.addToStructStore(data);
  }

  addToAssociationList({ key, value }) {
    const hashResult = this.hash(key);
    const node = new AssociationListNode(key, value);
    let currNode = this.associationList[hashResult];
    if (currNode) {
      while (currNode.next != null) {
        currNode = currNode.next;
      }
      currNode.next = node;
    } else {
      this.associationList[hashResult] = node;
    }
  }

  deleteFromAssociationList({ key, value }) {
    const hashResult = this.hash(key);
    let previousNode;
    let currNode = this.associationList[hashResult];
    while (currNode) {
      if (currNode.key === key && currNode.value === value) {
        if (previousNode) {
          previousNode.next = currNode.next;
        } else {
          this.associationList[hashResult] = currNode.next;
        }
        break;
      }
      previousNode = currNode;
      currNode = currNode.next;
    }
  }

  addToArrayStore({ key, value }) {
    const hashResult = this.hash(key);
    const node = new ArrayStoreNode([key, value]);
    let currNode = this.arrayStore[hashResult];
    if (currNode) {
      while (currNode.next != null) {
        currNode = currNode.next;
      }
      currNode.next = node;
    } else {
      this.arrayStore[hashResult] = node;
    }
  }

  deleteFromArrayStore({ key, value }) {
    const hashResult = this.hash(key);
    let previousNode;
    let currNode = this.arrayStore[hashResult];
    while (currNode) {
      if (currNode.value[0] === key && currNode.value[1] === value) {
        if (previousNode) {
          previousNode.next = currNode.next;
        } else {
          this.arrayStore[hashResult] = currNode.next;
        }
        break;
      }
      previousNode = currNode;
      currNode = currNode.next;
    }
  }
  addToStructStore(data) {
    const hashResult = this.hash(data.key);
    const node = new StructStoreNode(data);
    let currNode = this.structStore[hashResult];
    if (currNode) {
      while (currNode.next != null) {
        currNode = currNode.next;
      }
      currNode.next = node;
    } else {
      this.structStore[hashResult] = node;
    }
  }

  deleteFromStructStore({ key, value }) {
    const hashResult = this.hash(key);
    let previousNode;
    let currNode = this.structStore[hashResult];
    while (currNode) {
      const currNodeKey = currNode.value.key
      const currNodeValue = currNode.value.value;
      if (currNodeKey === key && currNodeValue === value) {
        if (previousNode) {
          previousNode.next = currNode.next;
        } else {
          this.structStore[hashResult] = currNode.next;
        }
        break;
      }
      previousNode = currNode;
      currNode = currNode.next;
    }
  }
}

class AssociationListNode {
  key;
  value;
  next;
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class ArrayStoreNode {
  value;
  next;
  constructor(value) {
    this.value = value;
  }
}

class StructStoreNode {
  value;
  next
  constructor(value) {
    this.value = value;
  }
}

const hashTable = new HashTable(10);
hashTable.addToAllHashTables({ key: 'mac', value: 'instructor' });
hashTable.addToAllHashTables({ key: 'sarah', value: 'instructor' });
hashTable.addToAllHashTables({ key: 'jackie', value: 'hasARealJob' });
hashTable.addToAllHashTables({ key: 'kirstie', value: 'fellow' });
hashTable.addToAllHashTables({ key: 'laura', value: 'fellow' });
console.log(hashTable.associationList);
console.log(hashTable.arrayStore);
console.log(hashTable.structStore);
