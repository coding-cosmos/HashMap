import LinkedList from "./linkedList";

class HashMap {
  maxCapacity = 16;
  buckets = [];
  capacity = 0;
    loadFactor = 0;

  #checkLoadFactor() {
    this.loadFactor = (this.capacity / this.maxCapacity) * 100;
    if (this.loadFactor > 0.75) {
      this.maxCapacity *= 2;
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.maxCapacity;
    }

    return hashCode;
  }

  set(key, value) {
    // Increase the number of buckets
    this.capacity++;

    // check load factor and update accordingly
    this.#checkLoadFactor();

    const bucketID = this.hash(key);

    // Update the value if key is already present..
    if (this.has(key)) {
      const linkedList = this.buckets[bucketID];
      tmp = linkedList.head;
      while (tmp.nextNode != null) {
        if (tmp.value.key == key) {
          tmp.value.value = value;
          return;
        }
        tmp = tmp.nextNode;
      }
    }

    // Add the {key:value} if not present already..
    const linkedList = new LinkedList();
    linkedList.append({ key, value });
    this.buckets[bucketID] = linkedList;
  }

    get(key) {
        const bucketID = this.hash(key);

        // if given bucket is empty return null
        if (this.buckets[ bucketID ] == null) {
            return null
        }

        // Check if bucket has the required 'key'
        const linkedList = this.buckets[ bucketID ];
        tmp = linkedList.head;
        while (tmp.nextNode != null) {
            if (tmp.value.key == key) {
                return tmp.value.value;
            }
            tmp = tmp.nextNode;
        }

        // Return 'null' if key is not matched within the bucket
        return null;
  }

    has(key) {
        const bucketID = this.hash(key);
        if (this.buckets[ bucketID ] == null) {
            return false;
        }

        const linkedList = this.buckets[ bucketID ];
        tmp = linkedList.head;
        while (tmp.nextNode != null) {
            if (tmp.value.key == key) {
                return true;
            }
            tmp = tmp.nextNode;
        }

        return false;
  }
    remove(key) {
        const bucketID = this.hash(key);
        if (this.buckets[ bucketID ] == null) {
            return false;
        }

        const linkedList = this.buckets[ bucketID ];
        tmp = linkedList.head;
        while (tmp.nextNode != null) {
            if (tmp.nextNode.value.key == key) {
                tmp.nextNode = tmp.nextNode.nextNode;
                if (linkedList.size() == 1) {
                    this.capacity--;
                }
                return true;
            }
            tmp = tmp.nextNode;
        }

        return false;
  }
    length() {
        let len = 0;
      for (const bucket of this.buckets) {
          len += bucket.size();
        }
        return len;
  }
    clear() {
        this.buckets = [];
        this.maxCapacity = 16;
        
        this.capacity = 0;
        this.loadFactor = 0;
  }
    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            tmp = bucket.head;
            while (tmp.nextNode != null) {
                keys.push(tmp.value.key);
            }

        }
        return keys;
  }
    values() {
      const values = [];
      for (const bucket of this.buckets) {
        tmp = bucket.head;
        while (tmp.nextNode != null) {
          values.push(tmp.value.value);
        }
      }
      return values;
  }

    entries() {
      const entries = [];
      for (const bucket of this.buckets) {
        tmp = bucket.head;
        while (tmp.nextNode != null) {
          entries.push(tmp.value);
        }
      }
      return entries;
  }
}
